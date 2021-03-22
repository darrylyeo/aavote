<script lang="ts">
	export let selected

	$: ancestors = selected.ancestors().slice(1).reverse()
	$: siblings = selected.parent?.children

	$: console.log(ancestors)
</script>

<style>
	.breadcrumb {
		display: grid;
		grid-auto-flow: column;
		gap: 0.25em;
		justify-content: start;
		align-items: baseline;
	}
	.breadcrumb > * {
		transition: 0.3s;
	}
	.breadcrumb > :last-child {
		font-weight: bold;
	}

	select {
		all: inherit;
		appearance: revert;
	}

	a, select {
		cursor: pointer;
	}
	a {
		text-decoration: underline;
	}
</style>

<div class="breadcrumb">
	{#each ancestors as ancestor}
		<a on:click={() => selected = ancestor}>{ancestor.data.name}</a>
		<span>›</span>
	{/each}
	{#if siblings?.length}
		<select on:change={e => selected = siblings[e.target.value]}>
			{#each siblings as sibling, i}
				<option value={i}>{sibling.data.name}</option>
			{/each}
		</select>
	{:else}
		<span>{selected.data.name}</span>
	{/if}
</div>