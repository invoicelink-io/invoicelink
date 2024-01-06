<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading="Invoices">
	<a href="/invoices/manage/new" class="variant-filled-primary btn btn-sm">New Invoice</a>
</PageHeading>

<div class="grid w-full gap-4 sm:grid-cols-3">
	<a class="card-primary gap-2 p-4" href="/invoices/manage">
		<span class="flex w-full justify-center sm:justify-start">
			<Icon name="document-plus" />
		</span>
		<h6 class="h6 w-full text-center sm:text-left">Manage Invoices</h6>
		<p class="w-full text-center text-sm font-light sm:text-left">
			Create and manage your invoices. View their status, download copies or resend them to clients.
		</p>
	</a>
	<a class="card-primary gap-2 p-4" href="/invoices/template">
		<span class="flex w-full justify-center sm:justify-start">
			<Icon name="document-text" />
		</span>
		<h6 class="h6 w-full text-center sm:text-left">Invoice Templates</h6>
		<p class="w-full text-center text-sm font-light sm:text-left">
			Customise your invoices by adding a logo, changing colours and layouts etc.
		</p>
	</a>
</div>
