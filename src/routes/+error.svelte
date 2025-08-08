<script>
	import { page } from "$app/stores";

	$: foo = $page.url.searchParams.get("modlist");
</script>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Ark Mods</title>
	</head>
	<body>
		<h1>Error</h1>
		{foo}
		<p>Status: %sveltekit.status%</p>
		<p>Message: %sveltekit.error.message%</p>
	</body>
</html>
