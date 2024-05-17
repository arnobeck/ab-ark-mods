<script>
	import { Store_ArkModList } from './StoreArk.js';
	import { copy } from '@svelte-put/copy';
	import { Button, Icon } from '@sveltestrap/sveltestrap';

	/**
     * @type {HTMLButtonElement}
     */
	let trigger;
	let copied = '';
  	function handleCopied(e /** @type {CustomEvent<CopyDetail>)} */) {
    	copied = e.target.value;
		// console.log(copied, e);
		console.log("copied=", copied);
  	}
</script>

<div class="copypaste">
	<!-- Mod&nbsp;list&nbsp;:  -->
	<input value={$Store_ArkModList.join(",")} readonly class="input"
	use:copy={{ trigger }}
    on:copied={handleCopied}
	/>
	<button class="icon" bind:this={trigger}></button>

</div>

<style>
	.copypaste {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.copypaste>.input {
		width: 300pt;
		color: gray;
		border-color: #262626;
		background-color: #0d0d0d;
	}

	.copypaste>.icon {
		padding-top: 38px;
		padding-left: 28px;
		margin-left: 8px;
		background-repeat: no-repeat;
		background-position: 0;
		line-height: 22px;
		position: relative;

		background-color: transparent;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-copy' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z' fill='%23ffffff'/%3E%3C/svg%3E");
	}

	.copypaste>.icon:before {
		margin-top: 10px;
		background-color: #333;
		color: #e5e5e5;
		font-weight: 400;
		padding: 4px 8px;
		box-shadow: 0 2px 10px rgba(0,0,0,.5);
		transform: translate(-50%,-4px);
		white-space: nowrap;
		transition: opacity .2s;
		pointer-events: none;
		z-index: 1;
		content: "Copier dans le presse-papier";
	}


	.copypaste>.icon:after,.copypaste>.icon:before {
		opacity: 0;
		position: absolute;
		left: 50%;
		top: 100%;
		transition: opacity .1s,transform .2s
	}

	.copypaste>.icon:after {
		content: "";
		margin-top: 4px;
		width: 0;
		height: 0;
		transform: translateY(2px);
		border-color: transparent transparent #333;
		border-style: solid;
		border-width: 0 6px 6px;
		transform: translate(-50%,-4px);
		filter: drop-shadow(0 2px 10px rgba(0,0,0,.5))
	}

	.copypaste>.icon:hover:after,.copypaste>.icon:hover:before {
		opacity: 1;
		transform: translate(-50%)
	}

</style>
