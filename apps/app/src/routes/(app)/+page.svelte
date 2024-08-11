<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ProfileCompletion from '$lib/components/ProfileCompletion.svelte';
	import { Card } from '@invoicelink/ui';
	import QuickLinkDrawer from '$lib/components/QuickLinkDrawer.svelte';
	import { getFirstWord, formatCurrency } from '@invoicelink/lib';
	import { page } from '$app/stores';

	// get user's first name
	const name = data.user?.name || data?.user?.username;
	const firstname = getFirstWord(name ?? '');

	// set greeting
	let greeting = 'Welcome back';
	if (firstname != '') {
		greeting += `, ${firstname}`;
	}
</script>

<PageHeading {greeting}>
	<span>
		<QuickLinkDrawer />
		<a href="/invoices/management/manage" class="btn btn-accent btn-sm text-xs">New Invoice</a>
	</span>
</PageHeading>

<div class="grid w-full gap-4 md:grid-cols-3">
	{#if data.profileTasks.filter((item) => !item.complete).length > 0}
		<ProfileCompletion profileTasks={data.profileTasks} />
	{/if}

	<a href="/quick-links">
		<Card title="Quick Links">
			<div slot="actions">
				<div class="flex h-full flex-col items-end justify-end">
					{#if data.stats.unpaidQuickLinks === 0}
						<span class="text-3xl">None</span>
						<span class="text-sm">Create a link</span>
					{:else if data.stats.unpaidQuickLinks === 1}
						<span class="text-3xl">{data.stats.unpaidQuickLinks}</span>
						<span class="text-sm">Unpaid link</span>
					{:else}
						<span class="text-3xl">{data.stats.unpaidQuickLinks}</span>
						<span class="text-sm">Unpaid links</span>
					{/if}
				</div>
			</div>
		</Card>
	</a>

	<a href="/invoices/management">
		<Card title="Invoices">
			<div slot="actions">
				<div class="flex h-full flex-col items-end justify-end">
					{#if data.stats.unpaidInvoices === 0}
						<span class="text-3xl">Zero</span>
						<span class="text-sm">No invoices due</span>
					{:else}
						<span class="text-3xl"
							>{formatCurrency(
								data.stats.unpaidInvoices,
								$page.data.locale,
								$page.data.currency
							)}</span
						>
						<span class="text-sm">Amount outstanding</span>
					{/if}
				</div>
			</div>
		</Card>
	</a>
</div>
