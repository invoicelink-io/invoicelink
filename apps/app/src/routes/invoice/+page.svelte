<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Invoice from '$lib/components/Invoice.svelte';
	import QuickLink from '$lib/components/QuickLink.svelte';
</script>

{#if data.documentType === 'quick'}
	<QuickLink
		styles={{
			...data.styles,
			invoiceTypeColor: '#000000',
			columnHeadingColor: '#000000',
			logoAlt: 'QuickLink',
			senderAddressAlign: 'text-right'
		}}
		data={data.data}
	/>
{:else}
	<Invoice styles={data.styles} data={data.data} />
{/if}
