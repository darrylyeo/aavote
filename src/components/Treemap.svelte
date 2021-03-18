<script>
	import TreemapNode from './TreemapNode.svelte'

	export let root
</script>

<div>
	<TreemapNode node={root} let:node>
		<slot {node}></slot>
	</TreemapNode>
</div>

<style>
	div {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>