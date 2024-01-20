<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ProfileCompletion from '$lib/components/ProfileCompletion.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	const name = data.user?.name || data?.user?.username;
	let greeting = 'Welcome back';
	if (name && name?.trim() !== '') {
		greeting += `, ${name.trim().split(' ').at(0)}`;
	}

	// check if tour is present in query params
	const params = $page.url.searchParams;
	const tour = params.get('tour');

	if (tour && tour === '1') {
		drawerStore.open({
			id: 'tour-1'
		});
	}
</script>

<PageHeading heading={greeting} />

<div class="grid w-full gap-4 md:grid-cols-3">
	<ProfileCompletion profileTasks={data.profileTasks} />

	<div class="card-primary order-5 gap-2 p-4 sm:order-4">
		<h6 class="h6 w-full text-left">New Quick Link</h6>
		<p class="w-full text-left text-xs">
			Create a quick shareable link to send to clients for quick payments
		</p>
		<div class="flex w-full justify-end">
			<a href="/quick-links" class="variant-soft-surface btn btn-sm">Create</a>
		</div>
	</div>

	<div class="card-primary order-2 gap-2 p-4 sm:order-1">
		<h6 class="h6 w-full text-left">New Invoice</h6>
		<p class="w-full text-left text-xs">Create and send a new invoice to a client</p>
		<div class="flex w-full justify-end">
			<a href="/invoices/management/manage" class="variant-soft-surface btn btn-sm">Create</a>
		</div>
	</div>
</div>
