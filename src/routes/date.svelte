<script>
	export let date;
	export let locale = "i";

	$: formattedDate = new Date(date).toLocaleDateString(locale, {
		// weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
</script>

<style>
	span {
		font-variant-numeric: tabular-nums;
	}
</style>

<span>{formattedDate}</span>
