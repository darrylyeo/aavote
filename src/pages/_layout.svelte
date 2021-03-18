<!-- routify:options preload="proximity" -->

<script lang="ts">
	import { initClient } from '@urql/svelte'

	initClient({
		url: 'https://api.thegraph.com/subgraphs/name/aave/governance-v2'
	})
</script>

<style>
	main {
		display: grid;
		gap: 1rem;

		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
	}

	header {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		font-size: 3.5em;
		text-transform: uppercase;

		mix-blend-mode: overlay;

		color: rgba(255, 255, 255, 0.65);
		text-shadow: 0 1px 3px, 0 3px 20px;
	}
	@supports (-webkit-text-stroke: 1px) {
		h1 {
			color: rgba(255, 255, 255, 0.45);
			-webkit-text-stroke: 0.02em rgba(255, 255, 255, 0.65);
			text-shadow: 0 1px 3px, 0 3px 20px;
		}
	}
</style>

<main>
	<header>
		<h1>Aavote</h1>
		<div>
			<p>Aave governance dashboard</p>
		</div>
	</header>
	<slot></slot>
</main>

<svg viewBox="0 0 34.374 50" style="position: absolute;">
	<defs>
		<clipPath id="ghost-outline-mask" clipPathUnits="objectBoundingBox">
			<path d="M34.249 16.743a17.126 17.126 0 0 0-34.244 0v31.353a1.903 1.903 0 1 0 3.807 0v-5.533a1.903 1.903 0 0 1 3.807 0v2.619a1.903 1.903 0 1 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v.717a1.903 1.903 0 0 0 3.807 0v-.717a1.903 1.903 0 0 1 3.807 0v2.623a1.903 1.903 0 0 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v5.533a1.903 1.903 0 0 0 3.807 0V16.874a1.355 1.355 0 0 0-.005-.131z"/>
		</clipPath>
	</defs>
</svg>