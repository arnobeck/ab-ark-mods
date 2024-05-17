<script>
	export let number;
	export let locale = "fr-FR";

	$: formattedNumber = number.toLocaleString(locale, {
		notation: "compact",
		compactDisplay: "short",
		maximumSignificantDigits: 3
	});
</script>

<style>
	span {
		font-variant-numeric: tabular-nums;
	}
</style>

<span>{formattedNumber}</span>
