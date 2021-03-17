<script lang="ts">
	export let proposal

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


	import Date from './Date.svelte'
</script>

<style>
	.proposal {
		display: grid;

		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 1rem;
		padding: 1.5rem;
		mix-blend-mode: overlay;
	}
	.proposal.state-pending,
	.proposal.state-active,
	.proposal.state-queued {
		--state-color: rgb(222, 202, 89);
	}
	.proposal.state-failed,
	.proposal.state-canceled {
		--state-color: rgb(222, 89, 89);
	}
	.proposal.state-succeeded,
	.proposal.state-executed {
		--state-color: rgb(121, 201, 130);
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
</style>

<article class="proposal state-{proposal.state.toLowerCase()}">
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
			<p>Total Voting Supply: {proposal.totalVotingSupply}</p>
			<p>Total Proposition Supply: {proposal.totalPropositionSupply}</p>
			<p>Addresses voted: {proposal.totalCurrentVoters}</p>
		</div>
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