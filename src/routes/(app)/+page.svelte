<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ProfileCompletion from '$lib/components/ProfileCompletion.svelte';
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

<PageHeading {greeting} />

<div class="grid w-full gap-4 md:grid-cols-3">
	{#if data.profileTasks.filter((item) => !item.complete).length > 0}
		<ProfileCompletion profileTasks={data.profileTasks} />
	{/if}
	<div class="card card-bordered w-full">
		<div class="card-body">
			<h2 class="card-title">New Quick Link</h2>
			<p class="text-sm">Create a quick shareable link to send to clients for quick payments</p>
			<div class="card-actions justify-end">
				<a href="/quick-links" class="btn btn-primary btn-sm">Create</a>
			</div>
		</div>
	</div>

	<div class="card card-bordered w-full">
		<div class="card-body">
			<h2 class="card-title">New Invoice</h2>
			<p class="text-sm">Create and send a new invoice to a client</p>
			<div class="card-actions justify-end">
				<a href="/invoices/management/manage" class="btn btn-primary btn-sm">Create</a>
			</div>
		</div>
	</div>
</div>
