<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<footer>
	<div class="corner">
		<!-- <a href="https://kit.svelte.dev">
			<img src="/ASA_Logo.png" alt="ASA" />
		</a> -->
		&nbsp;
	</div>

	<nav>
		<span>Ark Mods is not affiliated with
			<a href="https://www.studiowildcard.com/" target="_blank" rel="external noopener">
				Studio Wildcard <img src="/wildcard.png" class="w-6 h-6 inline" alt="Studio Wildcard's logo"> 
			</a>
			or <a href="https://www.curseforge.com/" target="_blank" rel="external noopener">
				CurseForge <img src="/curseforge.png" class="w-6 h-6 inline" alt="CurseForge's logo">
			</a>
		</span>
	</nav>

	<div class="corner">
		&nbsp;
		<!-- <a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a> -->
	</div>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		font-style: italic;
		margin-top: 10pt;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid;
		/* border-top: var(--size) solid var(--color-theme-1); */
	}

	/* nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	} */

	/* a:hover {
		color: var(--color-theme-1);
	} */

	/* nav > img {
		height: 200pt;
	} */
</style>
