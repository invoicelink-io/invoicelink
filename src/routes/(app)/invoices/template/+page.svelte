<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading="Invoice Templates">
	<a href="/invoices/template/design" class="variant-filled-primary btn btn-sm">New Template</a>
</PageHeading>

<div class="grid h-full gap-4 sm:grid-cols-3">
	{#each data.templates as template}
		<a
			href="/invoices/template/design?id={template.id}"
			class="border-surface-100-800-token flex flex-col justify-between gap-4 rounded-lg border p-2"
		>
			<img
				src="/api/templatePreview?styleId={template.id}"
				class="rounded-lg"
				alt={template.name}
			/>
			<h6 class="h6 w-full text-center">{template.name}</h6>
		</a>
	{/each}
</div>
