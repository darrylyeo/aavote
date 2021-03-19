<script lang="ts">
	export let address = ''
	export let format: 'full' | 'middle-truncated' = 'middle-truncated'
	export let linked = true
	$: formattedAddress =
		format === 'middle-truncated'
			? address.slice(0, 6) + '…' + address.slice(-4)
			: address
</script>

{#if linked}
	<a
		class="address"
		href="https://etherscan.io/address/{address}"
		target="_blank">{formattedAddress}</a>
{:else}
	<span class="address">{formattedAddress}</span>
{/if}