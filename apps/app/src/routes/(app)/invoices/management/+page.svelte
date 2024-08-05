<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Card from '$lib/components/ui/Card.svelte';
</script>

<PageHeading>
	<a href="/invoices/management/manage" class="btn btn-accent btn-sm text-xs">New Invoice</a>
</PageHeading>

{#if data.invoices.length === 0}
	<Empty title="No Invoices" subtitle="Click new invoice to get started" />
{/if}

<div class="grid w-full gap-4 sm:grid-cols-3">
	{#each data.invoices as invoice}
		<a href="/invoices/management/manage?id={invoice.id}">
			<Card title={invoice.client.name}>
				<div slot="description" class="flex w-full flex-col gap-y-2 text-sm">
					<p class="flex justify-between">
						<strong>Issue Date</strong>
						{invoice.issueDate.toLocaleDateString('en-ZA', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</p>
					<p class="flex justify-between">
						<strong>Amount</strong>
						{invoice.total.toLocaleString('en-ZA', {
							style: 'currency',
							currency: 'ZAR'
						})}
					</p>
				</div>
				<div slot="actions">
					<Badge status={invoice.status} />
				</div>
			</Card>
		</a>
	{/each}
</div>
