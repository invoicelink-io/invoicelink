<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;

	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';

	import { Card, Badge } from '@invoicelink/ui';
	import { formatCurrency } from '@invoicelink/lib';
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
						{formatCurrency(invoice.total, $page.data.locale, $page.data.currency)}
					</p>
				</div>
				<div slot="actions">
					<Badge status={invoice.status} />
				</div>
			</Card>
		</a>
	{/each}
</div>
