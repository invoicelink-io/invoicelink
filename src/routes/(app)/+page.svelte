<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ProfileCompletion from '$lib/components/ProfileCompletion.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { getFirstWord } from '$lib/utils/stringHelpers';

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
		<a href="/quick-links" class="btn btn-accent btn-sm text-xs">Quick Link</a>
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
					<span class="text-3xl">0</span>
					<span class="text-sm">Create link</span>
				</div>
			</div>
		</Card>
	</a>

	<a href="/invoices/management">
		<Card title="Invoices">
			<div slot="actions">
				<div class="flex h-full flex-col items-end justify-end">
					<span class="text-3xl">R0k</span>
					<span class="text-sm">Amount Due</span>
				</div>
			</div>
		</Card>
	</a>
</div>
