<script>
	// import Counter from './Counter.svelte';
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { onMount } from 'svelte';
	import { page } from "$app/stores";
	import ArkModListInput from './ArkModListInput.svelte';
	import ArkModListOutput from './ArkModListOutput.svelte';
	import ArkModList from './ArkModList.svelte';
	import Edit from './Edit.svelte';
	import { Store_ArkModList, Store_ArkSelectedModList } from './StoreArk.js';
	
	let ArkModList_param = $page.url.hash.substring(1);

	const CS_ApiEndpoint = 'https://api.curse.tools/v1/cf';
	const CS_gameId = '083374';


	onMount(async () => {
		// console.log("load", ArkModList_param);
		if(ArkModList_param)
		{
			// @ts-ignore
			$Store_ArkSelectedModList /** @type {Promise<any[]>} */ = await searchModsByIdList(ArkModList_param);
			// searchModsByIdList(ArkModList_param);
			// console.log("searched", $Store_ArkSelectedModList)
		}
	});

	/**
     * @param {string} params
     */
	function parseProps(params)
	{
		let formated_params = [];
		let toHandle = params.split(",");
		// toHandle.forEach(function (mod) {
		for(let i=0 ; i<toHandle.length ; i++){
			let mod = toHandle[i];
			formated_params.push( parseInt(mod.trim()) );
		};
		// });
		return formated_params;
	}

	/**
     * @param {string} params
     */
	async function searchModsByIdList(params)
	{
		let formated_params = parseProps(params);
		// console.log("formated_params", formated_params);

		const headers = {
			// 'x-api-key': CS_ApiKey,
			'Accept':'application/json',
			'Content-Type':'application/json'
		};
		const POST_data = {
			"modIds": formated_params,
			"filterPcOnly": false
		};
		// const url = "https://api.curseforge.com/v1/mods";
		const url = CS_ApiEndpoint + "/mods";

		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(POST_data)
		});
		let responseData = await response.json();
		let mods = [];
		for(let j=0 ; j<responseData.data.length ; j++){
			let mod = responseData.data[j];
		// responseData.data.forEach(function (mod) {
			mods.push(mod);
		};
		// });
		return await mods;
	}

</script>

<svelte:head>
	<title>Ark Mods</title>
	<meta name="description" content="Ark mods list" />
</svelte:head>

<section>
	<h1>
		<!-- <span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span> -->

		Mods list
	</h1>
	<br />

	<Edit modListDetailed={[{id:-999}]} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

</style>
