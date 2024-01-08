<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import PageHeading from '$lib/components/PageHeading.svelte';
	import ProfileCompletion from '$lib/components/ProfileCompletion.svelte';

	const name = data.user?.name || data?.user?.username;
	let greeting = 'Welcome back';
	if (name && name?.trim() !== '') {
		greeting += `, ${name.trim().split(' ').at(0)}`;
	}
</script>

<PageHeading heading={greeting} />

<div class="grid w-full gap-4 md:grid-cols-3">
	<div class="card-primary gap-2 p-4">
		<h6 class="h6 w-full text-left">New Invoice</h6>
		<p class="w-full text-left text-xs">Create and send a new invoice to a client</p>
		<div class="flex w-full justify-end">
			<a href="/invoices/management/manage" class="variant-soft-surface btn btn-sm">Create</a>
		</div>
	</div>

	<div class="card-primary gap-2 p-4">
		<h6 class="h6 w-full text-left">Add Client</h6>
		<p class="w-full text-left text-xs">
			Add client details for a person or business you will be invoicing
		</p>
		<div class="flex w-full justify-end">
			<a href="/clients/manage" class="variant-soft-surface btn btn-sm">Create</a>
		</div>
	</div>

	<div class="card-primary gap-2 p-4">
		<h6 class="h6 w-full text-left">Create Template</h6>
		<p class="w-full text-left text-xs">
			Configure an invoice template to match your business or personal brand
		</p>
		<div class="flex w-full justify-end">
			<a href="/invoices/template/design" class="variant-soft-surface btn btn-sm">Create</a>
		</div>
	</div>

	<div class="card-primary gap-2 p-4">
		<h6 class="h6 w-full text-left">New Quick Link</h6>
		<p class="w-full text-left text-xs">
			Create a quick shareable link to send to clients for quick payments
		</p>
		<div class="flex w-full justify-end">
			<a href="/quick-links" class="variant-soft-surface btn btn-sm">Create</a>
		</div>
	</div>

	<ProfileCompletion profileTasks={data.profileTasks} />
</div>
