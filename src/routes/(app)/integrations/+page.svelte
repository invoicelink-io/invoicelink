<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="h3 my-4 w-full text-center sm:my-8">Configure payment integrations</h1>
<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
	{#each Object.keys(data.integrationStatus) as name}
		<a
			href="/integrations/{name.toLowerCase()}"
			class="{data.integrationStatus[name] === 'coming soon'
				? 'card-disabled cursor-not-allowed'
				: 'card'} flex h-28 w-full flex-col items-center justify-center text-center text-sm capitalize"
		>
			<Icon {name} />
			<p
				class="text-xs font-medium {data.integrationStatus[name] === `enabled`
					? `text-success-200`
					: `text-neutral-200`}"
			>
				{data.integrationStatus[name]}
			</p>
		</a>
	{/each}
</div>
