<script lang="ts">
	export let options = {}
	export let value
</script>

<style>
	label.style-full {
		display: grid;
	}
	input[type="radio"] {
		display: none;
	}
	span {
		display: inline-flex;
		justify-content: center;
		background-color: transparent;
		opacity: 0.66;
		transition: 0.3s;
		cursor: pointer;

		border-radius: 1rem;
		padding: 0.2em 0.8em;
	}
	span:hover {
		opacity: 0.9;
	}
	input[type="radio"]:checked ~ span {
		background-color: rgba(255, 255, 255, 0.75);
		font-weight: bold;
		opacity: 1;
		box-shadow: rgba(231, 145, 245, 0.267) 0px 2px 4px;
	}

	div {
		display: grid;
		grid-auto-flow: column;
		justify-content: end;
		align-items: center;
		gap: 0.15em;
	}
</style>

<div>
	{#each Object.entries(options) as [option, label]}
		<label class="select-option">
			<input type="radio" bind:group={value} value={option}>
			<span>{label}</span>
		</label>
	{/each}
</div>