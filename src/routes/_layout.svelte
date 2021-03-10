<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
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
</style>

<main>
	<slot></slot>
</main>

<svg viewBox="0 0 34.374 50" style="position: absolute;">
	<defs>
		<clipPath id="ghost-outline-mask" clipPathUnits="objectBoundingBox">
			<path d="M34.249 16.743a17.126 17.126 0 0 0-34.244 0v31.353a1.903 1.903 0 1 0 3.807 0v-5.533a1.903 1.903 0 0 1 3.807 0v2.619a1.903 1.903 0 1 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v.717a1.903 1.903 0 0 0 3.807 0v-.717a1.903 1.903 0 0 1 3.807 0v2.623a1.903 1.903 0 0 0 3.807 0v-2.623a1.9 1.9 0 0 1 1.9-1.9 1.9 1.9 0 0 1 1.9 1.9v5.533a1.903 1.903 0 0 0 3.807 0V16.874a1.355 1.355 0 0 0-.005-.131z"/>
		</clipPath>
	</defs>
</svg>