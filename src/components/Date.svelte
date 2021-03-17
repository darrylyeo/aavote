<script lang="ts">
	export let timestamp

	$: date = new Date(timestamp * 1000)
</script>

{date.toLocaleDateString()}