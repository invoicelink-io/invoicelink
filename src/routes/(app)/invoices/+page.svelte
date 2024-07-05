<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading>
	<a href="/invoices/management/manage" class="btn btn-accent btn-sm text-xs">New Invoice</a>
</PageHeading>

<div class="grid w-full gap-4 sm:grid-cols-3">
	<div class="card card-bordered">
		<div class="card-body">
			<h2 class="card-title">Invoices</h2>
			<p class="text-sm">
				Create and manage your recent invoices. View their status, download copies or resend them to
				clients.
			</p>
			<div class="card-actions justify-end">
				<a href="/invoices/management" class="btn btn-primary btn-sm">Manage</a>
			</div>
		</div>
	</div>
	<div class="card card-bordered">
		<div class="card-body">
			<h2 class="card-title">Templates</h2>
			<p class="text-sm">
				Customise your invoices by adding a logo, changing colours and layouts etc.
			</p>
			<div class="card-actions justify-end">
				<a href="/invoices/template" class="btn btn-primary btn-sm">Manage</a>
			</div>
		</div>
	</div>
</div>
