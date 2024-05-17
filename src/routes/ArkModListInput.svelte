<script>
	const CS_ApiEndpoint = 'https://api.curse.tools/v1/cf';
	const CS_gameId = '083374';

	// props
	export let ArkModList_param = '';

	import { Store_ArkModList, Store_ArkSelectedModList } from './StoreArk.js';
	import AutoComplete from "simple-svelte-autocomplete";
	import { onMount } from 'svelte';

	/**
     * @type {Promise<any[]>}
     */
	// let listArkMods;

	// onMount(async () => {
	// 	console.log("load", ArkModList_param);
	// 	if(ArkModList_param)
	// 	{
	// 		// @ts-ignore
	// 		$Store_ArkSelectedModList /** @type {Promise<any[]>} */ = await searchModsByIdList(ArkModList_param);
	// 		// searchModsByIdList(ArkModList_param);
	// 		console.log("searched", $Store_ArkSelectedModList)
	// 	}
	// });

	// /**
    //  * @param {string} params
    //  */
	// function parseProps(params)
	// {
	// 	let formated_params = [];
	// 	let toHandle = params.split(",");
	// 	// toHandle.forEach(function (mod) {
	// 	for(let i=0 ; i<toHandle.length ; i++){
	// 		let mod = toHandle[i];
	// 		formated_params.push( parseInt(mod.trim()) );
	// 	};
	// 	// });
	// 	return formated_params;
	// }

	// /**
    //  * @param {string} params
    //  */
	// async function searchModsByIdList(params)
	// {
	// 	let formated_params = parseProps(params);
	// 	// console.log("formated_params", formated_params);

	// 	const headers = {
	// 		// 'x-api-key': CS_ApiKey,
	// 		'Accept':'application/json',
	// 		'Content-Type':'application/json'
	// 	};
	// 	const POST_data = {
	// 		"modIds": formated_params,
	// 		"filterPcOnly": false
	// 	};
	// 	// const url = "https://api.curseforge.com/v1/mods";
	// 	const url = CS_ApiEndpoint + "/mods";

	// 	const response = await fetch(url, {
	// 		method: 'POST',
	// 		headers: headers,
	// 		body: JSON.stringify(POST_data)
	// 	});
	// 	let responseData = await response.json();
	// 	let mods = [];
	// 	for(let j=0 ; j<responseData.data.length ; j++){
	// 		let mod = responseData.data[j];
	// 	// responseData.data.forEach(function (mod) {
	// 		mods.push(mod);
	// 	};
	// 	// });
	// 	return await mods;
	// }

	
	// let selectedColorsItems = [{"name":"France","alpha2Code":"FR","independent":false},{"name":"Bolivia (Plurinational State of)","alpha2Code":"BO","independent":false}];

	/**
     * @param {string} keyword
     */
	async function searchMod(keyword) {
		const headers = {
			// 'x-api-key': CS_ApiKey,
			'Accept': 'application/json'
		};
		const url = CS_ApiEndpoint + "/mods/search?gameId="+CS_gameId+"&searchFilter="+encodeURIComponent(keyword);

		const response = await fetch(url, {
			method: 'GET',
			headers: headers
		});
		let responseData = await response.json();
		/**
         * @type {any[]}
         */
		let mods /** @type {any[]} */ = [];
		responseData.data.forEach(function (/** @type {any} */ mod) {
			mods.push(mod);
		});
		return mods;
	}
	/**
     * @type {any[]}
     */
	let selectedItem;

	/**
     * @param {{ id: any; }} item
     * @param {string} keywords
     */
	function itemFilter(item, keywords) {
		// return only colors which have nice: true
		// console.log(keywords, $Store_ArkModList, item);
		return !$Store_ArkModList.includes(item.id);
	}

	// items={$ArkSelectedModList}
	// localFiltering={false}

</script>

<div class="counter">
<p>
	<AutoComplete
		multiple=true
		orderableSelection=true
		labelFieldName="name"
		valueFieldName="id"
		items={$Store_ArkSelectedModList}
		bind:selectedItem={$Store_ArkSelectedModList}
		bind:value={$Store_ArkModList}
		searchFunction={searchMod}
		maxItemsToShowInList={10}
		delay={200}
		itemFilterFunction={itemFilter}
		>

		<div slot="item" let:item={item} let:label={label}>
			{@html label}
			 / <span style="color:{item.id}">{item.id}</span>
		</div>

	</AutoComplete>
</p>

</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.autocomplete.is-multiple .input-container {
		background-color: #262626;
	}
</style>
