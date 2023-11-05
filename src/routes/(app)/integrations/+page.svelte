<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="my-4 w-full text-center sm:my-8">Configure payment integrations</h1>
<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
	{#each Object.keys(data.integrationStatus) as name}
		<a
			href="/integrations/{name.toLowerCase()}"
			class="{data.integrationStatus[name] === 'coming soon'
				? 'cursor-not-allowed'
				: 'cursor-pointer'} card variant-filled-surface bg-surface-200-700-token card-hover flex h-28 w-full flex-col items-center justify-center p-4 text-center text-sm capitalize"
		>
			<Icon {name} />
			<p
				class="text-xs font-medium {data.integrationStatus[name] === `enabled`
					? `text-success-600`
					: `text-surface-400`}"
			>
				{data.integrationStatus[name]}
			</p>
		</a>
	{/each}
</div>
