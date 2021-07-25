<script context="module" lang="ts">
	export const prerender = true;
</script>


<script lang="ts">
	import Proposals from '../components/Proposals.svelte'
</script>


<svelte:head>
	<title>Aavote – Governance Dashboard for Aave v2 Protocol</title>
	<meta name="description" content="Aave Improvement Proposals (AIPs) describe standards for the Aave Protocol, including core protocol specifications, client APIs, and contract standards.">
</svelte:head>


<Proposals></Proposals>
