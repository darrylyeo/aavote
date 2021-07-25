<script lang="ts">
	import type { AllProposals } from '$houdini'

	export let proposal: AllProposals['result']['proposals'][number]


	import * as d3 from 'd3-hierarchy'

	const areaModes = {'equal': 'Equal', 'votingPower': 'Voting Power', 'voters': 'Voters'}
	let currentAreaMode: 'equal' | 'votingPower' | 'voters' = 'equal'

	$: treemapData = d3.hierarchy({
		type: 'vote-distribution',
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
						// vote: 'Yes',
						children: proposal.votes.filter(vote => vote.support === true).map(vote => ({
							type: 'vote',
							name: vote.voter,
							votingPower: vote.votingPower,
							voters: 1,
							vote: 'Yes'
						}))
					},
					{
						type: 'vote-choice',
						name: 'No Votes',
						// vote: 'No',
						children: proposal.votes.filter(vote => vote.support === false).map(vote => ({
							type: 'vote',
							name: vote.voter,
							votingPower: vote.votingPower,
							voters: 1,
							vote: 'No'
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
		for(const countProperty in areaModes)
			if(countProperty !== 'equal')
				node.data[countProperty] = (node.children || []).reduce((sum, child) => sum + +child.data[countProperty], +node.data[countProperty] || 0)
	})

	// Set the official .value property from which the d3-hierarchy layout is derived
	$: treemapData = treemapData.eachBefore(node => {
		if(currentAreaMode === 'equal'){
			node.value = 0.01 / (node.parent?.children.length || 1)
		}

		// Visualize area by property
		else {
			// node.value = node.data[currentAreaMode]

			// Adjust to ensure a minimum area
			node.value = node.data[currentAreaMode] / treemapData.data[currentAreaMode] + 0.01 / (node.parent?.children.length || 1)
			// node.value = node.data[currentAreaMode] / (node.parent?.data[currentAreaMode] || 1) * 100 + 1
			// node.value = Math.log(node.data[currentAreaMode])
			// console.log('node', node, node.data[currentAreaMode] / node.parent?.data[currentAreaMode])
		}
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
	import Select from './Select.svelte'
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

	.analytics {
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
	.proposed-by {
		font-weight: bold;
		opacity: 0.8;
	}
	.handle {
		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 0.4em;
		padding: 0.25em 0.4em;

		font-size: 0.8em;
		font-weight: bold;
		vertical-align: middle;
	}

	.node.location-chart {
		border: 2px solid transparent;
		padding: 0.5rem;
		border-radius: 0.5em;
		background-clip: padding-box;
		font-size: 0.8em;
		background-color: rgba(255, 255, 255, 0.5);
	}
	.node.location-chart.type-vote.vote-Yes {
		background-color: var(--green);
		color: white;
	}
	.node.location-chart.type-vote.vote-No {
		background-color: var(--red);
		color: white;
	}

	.node.location-chart abbr {
		text-decoration: none;
	}

	.node.location-chart .percent {
		font-size: 0.8em;
	}

	.footer-contents {
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
		align-items: center;
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

	<section class="analytics">
		{#if treemapData}
			<TreemapChart data={treemapData}>
				<div slot="node-contents" let:node let:location
					class="node location-{location} type-{node.data.type} vote-{node.data.vote}"
				>
					{#if node.data.type === 'vote-distribution'}
						{#if location === 'chart'}
							<h4>{node.data.name}</h4>
						{/if}
						<p>
							Total Voting Supply: {formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr>
						</p>
						<p>Addresses voted: {proposal.totalCurrentVoters}</p>
					{:else if node.data.type === 'voted'}
						{#if location === 'chart'}
							<h4>{node.data.name}</h4>
						{/if}
						<p>
							{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr>
							<span class="percent">({formatPercent(node.data.votingPower / node.parent.data.votingPower)} of total voting supply)</span>
						</p>
						<p>{node.data.voters} voters</p>
					{:else if node.data.type === 'vote-choice'}
						{#if location === 'chart'}
							<h4>{node.data.name}</h4>
						{/if}
						<p>
							{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr>
							<span class="percent">({formatPercent(node.data.votingPower / node.parent.data.votingPower)}<!-- {node.data.vote}-->)</span>
						</p>
						<p>{node.data.voters} voters</p>
					{:else if node.data.type === 'vote'}
						<p>
							{formatVotingPower(node.data.votingPower)} <abbr title="Voting Power">VP</abbr>
							<span class="percent">({formatPercent(node.data.votingPower / node.parent.data.votingPower)}{location === 'header' ? ` of "${node.data.vote}" votes` : ''})</span>
						</p>
						<strong><Address address={node.data.name} /></strong>
					{/if}
					{#if proposal.executor.minimumQuorum && node.data.name === 'Votes'}
						<p class="quorum">
							Quorum:
							{#if node.data.votingPower / node.parent.data.votingPower >= proposal.executor.minimumQuorum / 10000}
								<strong style="color: var(--green)">Present</strong>
							{:else}
								<strong style="color: var(--red)">Absent</strong>
							{/if}
							(required: {formatPercent(proposal.executor.minimumQuorum / 10000)} of total voting supply)
						</p>
					{/if}
				</div>

				<div slot="footer-contents" class="footer-contents">
					Treemap Area:
					<Select options={areaModes} bind:value={currentAreaMode} />
				</div>
			</TreemapChart>
		{/if}
	</section>

	<p class="links">
		{#if proposal.discussions && proposal.discussions !== 'Na'}
			<!-- Discussion: <a href={proposal.discussions}>{new URL(proposal.discussions).host}</a> -->
			<a href={proposal.discussions} target="_blank">Discussion</a>
			<span>•</span>
		{/if}
		<a href={explorerLink(proposal.govContract)} target="_blank">Governance Contract</a>
		<span>•</span>
		<a href={explorerLink(proposal.governanceStrategy) + "#code"} target="_blank">Governance Strategy</a>
		<span>•</span>
		<a href={explorerLink(proposal.creator)} target="_blank">Creator</a>
	</p>

	{#if proposal.author && proposal.author !== 'Na'}
		<p class="authors">
			<span class="proposed-by">Proposed by:</span>
			{#each [...proposal.author.matchAll(/(?:^|, )(.+?)(?: \(@(.+?)\))/g) || []] as [matchMedia, name, handle], i}
				{#if i}, {/if}
				<!-- <a href="https://twitter.com/{handle}" target="_blank">{name}</a> -->
				{name}
				<span class="handle">@{handle}</span>
			{/each}
		</p>
	{/if}
</article>