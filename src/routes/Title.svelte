<script>
	export let title = '';
</script>

<h1 class="title">
	<!-- dddddspan class="welcome">
		<picture>
			<source srcset={welcome} type="image/webp" />
			<img src={welcome_fallback} alt="Welcome" />
		</picture>
	</span> -->

	{#if title}
		<strong><i>Mod pack</i></strong>
		<br/>
		<span>{title}</span>
	{:else}
		<span>Mods list</span>
	{/if}
</h1>

<style>
	.title {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 0.8;
		flex: 0.6;
	}
	.title > span {
		color: #999;
	}
</style>
