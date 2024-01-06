<script lang="ts">
	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading="Invoice Management">
	<a href="/invoices/manage/new" class="variant-filled-primary btn btn-sm">New Invoice</a>
</PageHeading>

<Empty title="No Invoices" subtitle="Click new invoice to get started" />
