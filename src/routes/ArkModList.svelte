<script>
	const CS_ApiEndpoint = "https://api.curse.tools/v1";
	const CS_gameId = "083374";

	// import { spring } from 'svelte/motion';
	// console.log("list", $Store_ArkSelectedModList);
	// console.log("list2", modListDetailed);
	// let modListDetailed = $Store_ArkSelectedModList;

	import Date from "./Date.svelte";
	import Number from "./Number.svelte";
	let locale = "fr-FR";

	/**
     * Format bytes as human-readable text.
     * @param {string | number} bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use 
    binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     * @return Formatted string.
     */
	function humanFileSize(bytes, si = true, dp = 2) {
		const thresh = si ? 1000 : 1024;

		if (Math.abs(bytes) < thresh) {
			return bytes + " B";
		}

		// const units = si
		// 	? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		// 	: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		const units = ["Ko", "Mo", "Go", "To", "Po", "Eo", "Zo", "Yo"];
		let u = -1;
		const r = 10 ** dp;

		do {
			bytes /= thresh;
			++u;
		} while (
			Math.round(Math.abs(bytes) * r) / r >= thresh &&
			u < units.length - 1
		);

		return bytes.toFixed(dp) + " " + units[u];
	}
</script>

<div class=".search-page">
	{#await modListDetailed}
		<p>...waiting</p>
	{:then number}
		<!-- svelte-ignore a11y-missing-attribute -->
		{#each modListDetailed as mod, i}
			<div class="project-card">
				{#if mod.links}
					<a
						href={mod.links.websiteUrl}
						target="_blank"
						class="overlay-link"
						title="Go to {mod.name} Project Page"
						aria-label="Go to {mod.name} Project Page"
					></a>
				{/if}
				<div class="art">
					{#if mod.logo}
						<img
							id="row-image"
							alt="{mod.name} project avatar"
							loading="lazy"
							width="108"
							height="108"
							decoding="async"
							data-nimg="1"
							src={mod.logo.url}
							style="color: transparent;"
						/>
					{/if}
				</div>
				{#if mod.links}
					<a
						class="name"
						href={mod.links.websiteUrl}
						target="_blank"
						title="Go to {mod.name} Project Page"
						aria-label="Go to {mod.name} Project Page"
					>
						<span class="ellipsis">{mod.name}</span>
					</a>
				{/if}
				{#if mod.authors[0]}
					<span class="author">
						<div class="by-author-link">
							By<a
								class="author-name"
								href={mod.authors[0].url}
								target="_blank"
							>
								<span class="ellipsis"
									>{mod.authors[0].name}</span
								>
							</a>
						</div>
					</span>
				{/if}

				<p class="description">{mod.summary}</p>
				<ul class="details-list">
					<li class="detail-downloads">
						<Number number={mod.downloadCount} {locale} />
					</li>
					<li class="detail-updated">
						<span><Date date={mod.dateModified} {locale} /></span>
					</li>
					<li class="detail-created">
						<span><Date date={mod.dateCreated} {locale} /></span>
					</li>
					{#if mod.latestFiles[0]}
						<li class="detail-size">
							{humanFileSize(mod.latestFiles[0].fileSizeOnDisk)}
						</li>
						{#if mod.latestFiles[0].gameVersions}
							<li class="detail-game-version">
								{mod.latestFiles[0].gameVersions[0]}
							</li>
						{/if}
					{/if}
				</ul>
				<ul class="categories">
					<li><a class="class-tag">Mods</a></li>
					{#if mod.categories}
						{#each mod.categories.slice(0, 3) as category, j}
							<li>
								<a
									title="Search all {category.name}"
									aria-label="Search all {category.name}"
									href="https://www.curseforge.com/ark-survival-ascended/search?class=mods&categories={category.slug}"
									target="_blank"
								>
									{category.name}
								</a>
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
</style>
