<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { Card } from '@invoicelink/ui';
</script>

<PageHeading>
	<a href="/invoices/management/manage" class="btn btn-accent btn-sm text-xs">New Invoice</a>
</PageHeading>

<div class="grid w-full gap-4 sm:grid-cols-3">
	<a href="/invoices/management">
		<Card
			title="Invoices"
			description="Create and manage your recent invoices. View their status, download copies or resend them to clients."
		/>
	</a>
	<a href="/invoices/template">
		<Card
			title="Invoice Styles"
			description="Customise your invoices by adding a logo, changing colours and layouts etc."
		/>
	</a>
</div>
