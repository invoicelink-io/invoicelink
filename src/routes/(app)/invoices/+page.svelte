<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading="Invoices">
	<a href="/invoices/management/manage" class="variant-filled-primary btn btn-sm">New Invoice</a>
</PageHeading>

<div class="grid w-full gap-4 sm:grid-cols-3">
	<div class="card-primary gap-2 p-4">
		<h6 class="h6 w-full text-left">Invoices</h6>
		<p class="w-full text-left text-xs">
			Create and manage your recent invoices. View their status, download copies or resend them to
			clients.
		</p>
		<div class="flex w-full justify-end">
			<a href="/invoices/management" class="variant-soft-surface btn btn-sm">Manage</a>
		</div>
	</div>
	<div class="card-primary gap-2 p-4">
		<h6 class="h6 w-full text-left">Templates</h6>
		<p class="w-full text-left text-xs">
			Customise your invoices by adding a logo, changing colours and layouts etc.
		</p>
		<div class="flex w-full justify-end">
			<a href="/invoices/template" class="variant-soft-surface btn btn-sm">Manage</a>
		</div>
	</div>
</div>
