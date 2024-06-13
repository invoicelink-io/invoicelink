<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import { twMerge } from 'tailwind-merge';
</script>

<PageHeading>
	<a href="/invoices/template/design" class="btn btn-accent btn-sm text-xs">New Template</a>
</PageHeading>

<div
	class={twMerge(
		'grid h-full gap-4 sm:grid-cols-3',
		`${data.templates.length === 0 ? `sm:grid-cols-1` : ``}`
	)}
>
	{#if data.templates.length === 0}
		<Empty title="No Templates" subtitle="Click new template to get started" />
	{:else}
		{#each data.templates as template}
			<a href="/invoices/template/design?id={template.id}" class="card card-bordered card-compact">
				<div class="card-body">
					<img src={template.previewSrc} class="rounded-[var(--rounded-box)]" alt={template.name} />
					<h2 class="card-title justify-center text-sm">{template.name}</h2>
				</div>
			</a>
		{/each}
	{/if}
</div>
