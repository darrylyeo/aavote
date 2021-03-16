<script lang="ts">
	import { initClient } from '@urql/svelte'

	initClient({
		url: 'https://api.thegraph.com/subgraphs/name/aave/governance-v2'
	})

	import '@fontsource/varela-round'
	import Proposals from '../components/Proposals.svelte'
</script>

<svelte:head>
	<title>Aavote – Governance Dashboard for Aave v2 Protocol</title>
</svelte:head>

<h1>Aavote</h1>

<Proposals></Proposals>
