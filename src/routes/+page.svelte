<script lang="ts">
	import { skills } from '$lib/smed.ts';
	import Logo from '$lib/components/Logo.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const { id, createdAt, description, discordId, fileName, height, size, width } = data;
	import RelativeTime from '@yaireo/relative-time';
	const relativeTime = new RelativeTime();
	const url = `https://smed.wtf/api/cdn/${id}`;
	const SEO = {
		name: "SMED's CDN",
		imgLink: `https://${id}.smed.wtf/`,
		imgDescription: description ?? 'SMED Website / CDN',
		description: id ? `${width}x${height} - ${createdAt ? relativeTime.from(createdAt) : ''}` : "",
		imgUrl: url ?? 'https://smed.wtf/favicon.png',
		color: '#FFBB00',
		keywords: 'smed,cdn,image,hosting'
	};
</script>

<svelte:head>
	<title>{SEO.name}</title>
	<link type="application/json+oembed" href="/oembed.json" />
	<meta property="og:site_name" content={SEO.name} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={SEO.imgLink} />
	<meta property="og:title" content={SEO.imgDescription} />
	<meta property="og:image" content={SEO.imgUrl} />
	<meta name="theme-color" content={SEO.color} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=0.5, maximum-scale=2.0, shrink-to-fit=no"
	/>
	<meta name="MobileOptimized" content="width" />
	<link rel="icon" href={SEO.imgUrl} />
	<meta name="keywords" content={SEO.keywords} />
	<meta name="description" content={SEO.description} />
	<meta property="twitter:description" content={SEO.description} />
	<meta data-react-helmet="true" property="og:description" content={SEO.description} />
	<meta itemprop="name" content={SEO.name} />
	<meta itemprop="description" content={SEO.description} />
	<meta itemprop="image" content={SEO.imgUrl} />
</svelte:head>

{#if !id}
	<div class="flex items-center justify-center mt-16 mx-0 lg:mx-16 flex-col lg:flex-row">
		<div class="flex flex-col max-w-2xl items-center lg:items-start m-4">
			<h1 class="text-7xl lg:text-9xl font-semibold">SMED</h1>
			<p
				class="text-secondary lg:text-3xl text-xl font-normal tracking-wide my-10 text-center lg:text-start"
			>
				A <span class="france">french</span> motivated developer who loves learning new things.
			</p>
			<div class="flex flex-wrap justify-center lg:justify-between">
				{#each skills as { skill, color, path }}
					<Logo logo={skill} {color} {path} />
				{/each}
			</div>
		</div>
		<div class="flex justify-center items-center lg:mt-0 mt-16">
			<div class="avatar w-96 h-96" />
		</div>
	</div>
{:else}
	<div class="flex items-center flex-col">
		<div class="text-4xl my-4">{description}</div>
		<div class="w-[90%] lg:w-[40%] flex justify-center">
			<img class="w-full h-full shadow-2xl rounded-lg" src={url} alt={description} />
		</div>
		<div class="text-secondary mt-4">{width}x{height} - {relativeTime.from(createdAt)}</div>
	</div>
{/if}
