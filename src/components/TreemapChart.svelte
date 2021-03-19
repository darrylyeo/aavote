<script>
	import * as d3 from 'd3-hierarchy'
	import { tweened } from 'svelte/motion'
	import * as eases from 'svelte/easing'
	import { fade } from 'svelte/transition'
	import Chart from './Chart.svelte'
	import Treemap from './Treemap.svelte'

	export let data

	const root = d3.treemap()(
		d3.hierarchy(data)
			.sum(d => d.value)
			.sort((a, b) => b.value - a.value)
	)

	let selected = root

	const select = node => {
		while (node.parent && node.parent !== selected) {
			node = node.parent
		}

		if (node && node.children) selected = node
	}

	const breadcrumbs = node => {
		const crumbs = []
		while (node) {
			crumbs.unshift(node.data.name)
			node = node.parent
		}

		return crumbs.join('/')
	}

	const extents = tweened(undefined, {
		easing: eases.cubicOut,
		duration: 400
	})

	const isVisible = (a, b) => {
		while (b) {
			if (a.parent === b) return true
			b = b.parent
		}

		return false
	}

	$: $extents = {
		x1: selected.x0,
		x2: selected.x1,
		y1: selected.y1,
		y2: selected.y0
	}
</script>

<button class="breadcrumbs" disabled="{!selected.parent}" on:click="{() => selected = selected.parent}">
	{breadcrumbs(selected)}
</button>

<div class="chart">
	<Chart x1={$extents.x1} x2={$extents.x2} y1={$extents.y1} y2={$extents.y2}>
		<Treemap {root} let:node>
			{#if isVisible(node, selected)}
				<div
					transition:fade={{duration: 400}}
					class="node"
					class:leaf={!node.children}
					on:click="{() => select(node)}"
				>
					<slot name="node-contents" {node}></slot>
				</div>
			{/if}
		</Treemap>
	</Chart>
</div>

<style>
	.breadcrumbs {
		width: 100%;
		padding: 0.3rem 0.4rem;
		background-color: transparent;
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		border: none;
		cursor: pointer;
		outline: none;
	}

	.breadcrumbs:disabled {
		cursor: default;
	}

	.chart {
		width: 100%;
		height: 400px;
		overflow: hidden;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: all;
	}

	.node:not(.leaf) {
		cursor: pointer;
	}

	.node > :global(*) {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
</style>