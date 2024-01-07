<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading="Invoice Management">
	<a href="/invoices/management/manage" class="variant-filled-primary btn btn-sm">New Invoice</a>
</PageHeading>

{#if data.invoices.length === 0}
	<Empty title="No Invoices" subtitle="Click new invoice to get started" />
{/if}

<div class="grid w-full gap-4 sm:grid-cols-3">
	{#each data.invoices as invoice}
		<a class="card-primary gap-2 p-4" href="/invoices/management/manage?id={invoice.id}">
			<div class="flex w-full items-center justify-between">
				<h6 class="h6">{invoice.client.name}</h6>
				<span class="variant-soft-primary badge">
					{invoice.status === 'PAID' ? 'Paid' : 'Unpaid'}
				</span>
			</div>
			<hr />
			<div class="flex w-full items-center justify-between text-xs">
				<span>Issue Date</span>
				<p class="font-light">
					{invoice.issueDate.toLocaleDateString('en-ZA', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>
			<div class="flex w-full items-center justify-between text-xs">
				<span>Amount</span>
				<p class="font-light">
					{invoice.total.toLocaleString('en-ZA', {
						style: 'currency',
						currency: 'ZAR'
					})}
				</p>
			</div>
		</a>
	{/each}
</div>
