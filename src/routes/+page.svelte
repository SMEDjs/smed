<script>
	import { skills } from '$lib/smed.ts';
	import { t } from '$lib/translations/translations';
	import Logo from '$lib/components/Logo.svelte';
</script>

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
