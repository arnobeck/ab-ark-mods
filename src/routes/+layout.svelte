<script>
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
  	// import './bulma.css';
  	// import './cs.css';
</script>

<svelte:head>
  	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="/bulma.css" />
	<link rel="stylesheet" href="/cs.css" />
</svelte:head>

<div class="app">
	<Header />

	<main class="main">
		<slot />
	</main>

	<!-- <footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
	<Footer />
</div>

<style>
	
</style>
