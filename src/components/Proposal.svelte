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

	header {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1em;
	}

	.short-description {
		font-size: 1.1em;
		padding: 1em;
		background-color: rgba(0, 0, 0, 0.05);
	}

	.aip-number {
		display: grid;
		place-content: center;
		gap: 0;
		line-height: 1;

		background-color: white;
		width: 3em;
		height: 3em;

		/*
		clip-path: path("M34.249 16.743a17.126 17.126 0 0 0-34.244 0v31.353a1.903 1.903 0 1 0 3.807 0v-5.533a1.903 1.903 0 0 1 3.807 0v2.619a1.903 1.903 0 1 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v.717a1.903 1.903 0 0 0 3.807 0v-.717a1.903 1.903 0 0 1 3.807 0v2.623a1.903 1.903 0 0 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v5.533a1.903 1.903 0 0 0 3.807 0V16.874a1.355 1.355 0 0 0-.005-.131z");
		*/
		/* -webkit-clip-path: url(#ghost-outline-mask);
		clip-path: url(#ghost-outline-mask); */
	}
	.aip-number .aip {
		font-size: 0.5em;
	}
	.aip-number .number {
		font-size: 1.3em;
	}

	.created {
		opacity: 0.6;
		font-size: 0.7em;
	}

	.updated {
		opacity: 0.6;
		font-size: 0.7em;
	}
</style>

<article class="proposal">
	<header>
		<span class="aip-number">
			<span class="aip">AIP</span>
			<span class="number">#{proposal.aipNumber}</span>
		</span>
		<div>
			<h2>{proposal.title}</h2>
			<p>
				{#if proposal.author && proposal.author !== 'Na'}
					<span>by {proposal.author}</span>
				{/if}
				<span class="created">created <Date timestamp={proposal.createdTimestamp} /></span>
				{#if proposal.lastUpdateTimestamp != proposal.createdTimestamp}
					<span class="updated">(updated <Date timestamp={proposal.lastUpdateTimestamp} />)</span>
				{/if}
			</p>
		</div>
	</header>
	<p class="short-description">{proposal.shortDescription}</p>

	

	<p>Addresses voted: {proposal.totalCurrentVoters}</p>

	<p>Yes: {proposal.currentYesVote}</p>
	<p>No: {proposal.currentNoVote}</p>
	<p>Total Voting Supply: {proposal.totalVotingSupply}</p>
	<p>Total Proposition Supply: {proposal.totalPropositionSupply}</p>

	{#if proposal.discussions && proposal.discussions !== 'Na'}
		<a href={proposal.discussions}>Discussion: {new URL(proposal.discussions).host}</a>
	{/if}

	<!-- {#await fetch(`https://ipfs.io/ipfs/${proposal.ipfsHash}`).then(r => r.json())}
		Fetching details from IPFS...
	{:then data}
		{JSON.stringify(data)}
	{/await} -->
</article>