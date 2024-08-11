<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Invoice from '$lib/components/Invoice.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { defaultInvoice } from '@invoicelink/lib/defaults';
	import { superForm } from 'sveltekit-superforms/client';
	import InvoiceAlert from '$lib/components/invoice/InvoiceAlert.svelte';
	import toast from 'svelte-french-toast';

	let submitting: 'create' | 'update' | 'delete' | null = null;

	// Set defaults
	const invoice = defaultInvoice;
	const displayAddress = {
		id: '',
		line1: 'Address Line 1',
		line2: 'Address Line 2',
		line3: 'Address Line 3',
		postalCode: '4321',
		userId: ''
	};
	invoice.user.name = 'Your Name';
	invoice.client.name = 'Client Name';
	invoice.sendersAddress = displayAddress;
	invoice.client.address = displayAddress;

	const { form, message, enhance } = superForm(data.form, {
		resetForm: false,
		onSubmit: ({ action }) => {
			if (action.search.includes('?/delete')) {
				submitting = 'delete';
			} else if (action.search.includes('?/update')) {
				submitting = 'update';
			} else {
				submitting = 'create';
			}
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid integration');
			}

			submitting = null;
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
			submitting = null;
		}
	});
</script>

<PageHeading />

<InvoiceAlert />

<div class="relative flex h-[70vh] max-h-[70vh] w-full flex-col gap-4 lg:flex-row">
	<div class="hide-scrollbar flex-grow rounded-lg border lg:overflow-y-scroll">
		<Invoice styles={$form} data={invoice} />
	</div>
	<div class="hide-scrollbar pb-8 lg:overflow-y-scroll lg:pb-0">
		<ControlPanel bind:form={$form} {enhance} {submitting} />
	</div>
</div>
