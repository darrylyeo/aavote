<script lang="ts">
	export let proposal

	import * as d3 from 'd3-hierarchy'

	const countProperties = ['votingPower', 'voters']
	let currentCountProperty: 'votingPower' | 'voters' = 'votingPower'

	$: treemapData = d3.hierarchy({
		type: 'root',
		name: 'Vote Distribution',
		// value: Number(proposal.totalVotingSupply),
		children: [
			{
				type: 'voted',
				name: 'Votes',
				// value: Number(proposal.currentYesVote) + Number(proposal.currentNoVote),
				children: [
					{
						type: 'vote-choice',
						name: 'Yes Votes',
						children: proposal.votes.filter(vote => vote.support === true).map(vote => ({
							type: 'vote',
							name: vote.voter,
							votingPower: vote.votingPower,
							voters: 1,
							support: vote.support
						}))
					},
					{
						type: 'vote-choice',
						name: 'No Votes',
						children: proposal.votes.filter(vote => vote.support === false).map(vote => ({
							type: 'vote',
							name: vote.voter,
							votingPower: vote.votingPower,
							voters: 1,
							support: vote.support
						}))
					}
				]
			},
			{
				type: 'voted',
				name: 'Non-Votes',
				votingPower: Number(proposal.totalVotingSupply) - (Number(proposal.currentYesVote) + Number(proposal.currentNoVote))
			}
		]
	})
	.eachAfter(node => {
		for(const countProperty of countProperties)
			node.data[countProperty] = (node.children || []).reduce((sum, child) => sum + +child.data[countProperty], +node.data[countProperty] || 0)
	})

	// Set the official .value property from which the d3-hierarchy layout is derived
	$: treemapData.eachAfter(node => {
		// node.value = node.data[currentCountProperty]

		// Adjust to ensure a minimum area
		node.value = node.data[currentCountProperty] / treemapData.data[currentCountProperty] + 0.1 / (node.parent?.children.length || 1)
		// node.value = node.data[currentCountProperty] / (node.parent?.data[currentCountProperty] || 1) * 100 + 1
		// node.value = Math.log(node.data[currentCountProperty])
		// console.log('node', node, node.data[currentCountProperty] / node.parent?.data[currentCountProperty])
	})
		.sort((a, b) => b.height - a.height || b.value - a.value)

	$: console.log(treemapData)


	const regex = /^AIP (\d+):/
	$: if(proposal.aipNumber == 0){
		const match = proposal.title.match(regex)
		if(match){
			proposal.title = proposal.title.replace(regex, '')
			proposal.aipNumber = match[1]
		}
	}


	function explorerLink(address){
		return `https://etherscan.io/address/${address}`
	}

	function formatPercent(number, maxDecimals = 3){
		return new Intl.NumberFormat(globalThis.navigator.languages, {
			minimumFractionDigits: maxDecimals,
			maximumFractionDigits: maxDecimals
		}).format(number * 100) + '%'
	}
	function formatVotingPower(number, maxDecimals = 0){
		return new Intl.NumberFormat(globalThis.navigator.languages, {
			minimumFractionDigits: maxDecimals,
			maximumFractionDigits: maxDecimals
		}).format(number / 1e18)// + ' quintillion'
	}


	import Address from './Address.svelte'
	import Date from './Date.svelte'
	import TreemapChart from './TreemapChart.svelte'
</script>

<style>
	.proposal {
		display: grid;
	}
	.proposal.state-pending,
	.proposal.state-active,
	.proposal.state-queued {
		--state-color: var(--yellow);
	}
	.proposal.state-failed,
	.proposal.state-canceled {
		--state-color: var(--red);
	}
	.proposal.state-succeeded,
	.proposal.state-executed {
		--state-color: var(--green);
	}

	header {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1em;
	}

	.vote-details {
		display: grid;
		padding: 1em;
		border-radius: 1rem;
		background-color: rgba(0, 0, 0, 0.05);
	}
	.short-description {
		font-size: 1.1rem;
	}

	.aip-number {
		display: grid;
		place-content: center;
		text-align: center;
		gap: 0;
		line-height: 1;

		width: 3.33em;
		height: 3.33em;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 0.5em;

		/*
		clip-path: path("M34.249 16.743a17.126 17.126 0 0 0-34.244 0v31.353a1.903 1.903 0 1 0 3.807 0v-5.533a1.903 1.903 0 0 1 3.807 0v2.619a1.903 1.903 0 1 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v.717a1.903 1.903 0 0 0 3.807 0v-.717a1.903 1.903 0 0 1 3.807 0v2.623a1.903 1.903 0 0 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v5.533a1.903 1.903 0 0 0 3.807 0V16.874a1.355 1.355 0 0 0-.005-.131z");
		*/
		/* -webkit-clip-path: url(#ghost-outline-mask);
		clip-path: url(#ghost-outline-mask); */
	}
	.aip-number .aip {
		font-size: 0.75em;
	}
	.aip-number .number {
		font-size: 1.25em;
	}

	.status-and-dates {
		font-size: 0.85em;
	}
	.executed {
		color: var(--state-color);
	}
	.created, .updated {
		opacity: 0.6;
	}

	.authors {
		font-size: 0.85em;
		opacity: 0.6;
	}

	.vote-node {
		border: 2px solid transparent;
		padding: 0.5rem;
		border-radius: 0.5em;
		background-clip: padding-box;
		font-size: 0.8em;
		background-color: rgba(255, 255, 255, 0.5);
	}
	.vote-node.support-true {
		background-color: var(--green);
		color: white;
	}
	.vote-node.support-false {
		background-color: var(--red);
		color: white;
	}

	.vote-node abbr {
		text-decoration: none;
	}
</style>

<article class="proposal card state-{proposal.state.toLowerCase()}">
	<header>
		<span class="aip-number">
			<span class="aip">AIP</span>
			<span class="number">#{proposal.aipNumber}</span>
		</span>
		<div>
			<h2>{proposal.title}</h2>
			<p class="status-and-dates">
				<span class="created">created <Date timestamp={proposal.createdTimestamp} /></span>
				{#if proposal.lastUpdateTimestamp != proposal.createdTimestamp}
					<span>•</span>
					<span class="updated">updated <Date timestamp={proposal.lastUpdateTimestamp} /></span>
				{/if}
				{#if proposal.executionTime}
					<span>•</span>
					<span class="executed">executed <Date timestamp={proposal.executionTime} /></span>
				{/if}
			</p>
		</div>
	</header>

	<p class="short-description">{proposal.shortDescription}</p>

	<!-- {#await fetch(`https://ipfs.io/ipfs/${proposal.ipfsHash}`).then(r => r.json())}
		Fetching details from IPFS...
	{:then data}
		{JSON.stringify(data)}
	{/await} -->

	<div class="vote-details">
		<div>
			<p>Yes: {proposal.currentYesVote}</p>
			<p>No: {proposal.currentNoVote}</p>
			<p>Total Voting Supply: {formatVotingPower(proposal.totalVotingSupply)} <abbr title="Voting Power">VP</abbr></p>
			<p>Total Proposition Supply: {formatVotingPower(proposal.totalPropositionSupply)} <abbr title="Voting Power">VP</abbr></p>
			<p>Addresses voted: {proposal.totalCurrentVoters}</p>
		</div>
		{#if treemapData}
			<TreemapChart data={treemapData}>
				<div slot="node-contents" let:node
					class="vote-node type-{node.data.type} support-{node.data.support}"
				>
					{#if node.data.type === 'root'}
						<h4>{node.data.name}</h4>
						<p>{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr></p>
					{:else if node.data.type === 'voted'}
						<h4>{node.data.name}</h4>
						<p>{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr> ({formatPercent(node.data.votingPower / node.parent.data.votingPower)})</p>
						<p>{node.data.voters} voters</p>
					{:else if node.data.type === 'vote-choice'}
						<h4>{node.data.name}</h4>
						<p>{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr> ({formatPercent(node.data.votingPower / node.parent.data.votingPower)})</p>
						<p>{node.data.voters} voters</p>
					{:else if node.data.type === 'vote'}
						<p>{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr> ({formatPercent(node.data.votingPower / node.parent.data.votingPower)})</p>
						<strong><Address address={node.data.name} /></strong>
					{/if}
				</div>
			</TreemapChart>
		{/if}
	</div>

	<p class="links">
		{#if proposal.discussions && proposal.discussions !== 'Na'}
			<!-- Discussion: <a href={proposal.discussions}>{new URL(proposal.discussions).host}</a> -->
			<a href={proposal.discussions}>Discussion</a>
			<span>•</span>
		{/if}
		<a href={explorerLink(proposal.govContract)}>Governance Contract</a>
	</p>

	{#if proposal.author && proposal.author !== 'Na'}
		<p class="authors">Proposed by: {proposal.author}</p>
	{/if}
</article>