<script>
	export let node
	
	import Box from './Box.svelte'
</script>

<Box x1={node.x0} x2={node.x1} y1={node.y1} y2={node.y0}>
	<slot {node}></slot>
</Box>

{#each (node.children || []) as child}
	<svelte:self node={child} let:node>
		<slot {node}></slot>
	</svelte:self>
{/each}