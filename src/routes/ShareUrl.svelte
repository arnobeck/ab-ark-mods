<script>
	import { Store_ArkModList, Store_ShareTitle } from "./StoreArk.js";

	export let modListDetailed = [];
	// export let title = '';
	// export let title = '';

	/**
	 * @type {HTMLButtonElement}
	 */
	let trigger;
	let copied = "";
	function handleCopied(e /** @type {CustomEvent<CopyDetail>)} */) {
		copied = e.target.value;
		// console.log(copied, e);
		console.log("copied=", copied);
	}
</script>

<div class="shareurl">
	<input
		type="string"
		bind:value={$Store_ShareTitle}
		placeholder="Modpack Title"
	/>
	{#if $Store_ShareTitle}
		<a
			href="/modpack/{$Store_ShareTitle}/{$Store_ArkModList.join(',')}"
			target="_blank">Share</a
		>
	{:else}
		<a href="/modpack/{$Store_ArkModList.join(',')}" target="_blank"
			>Share</a
		>
	{/if}
</div>

<style>
	.shareurl {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}
</style>
