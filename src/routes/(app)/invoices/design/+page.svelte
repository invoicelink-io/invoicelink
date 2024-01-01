<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Invoice from '$lib/components/Invoice.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import type { FullInvoice } from '$lib/types';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	const { form, message, enhance, submitting } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid integration');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});

	let invoice: FullInvoice = {
		id: '',
		userId: '',
		serial: 'INV-2023-00001',
		issueDate: new Date(),
		dueDate: new Date(),
		sendersAddressId: '',
		sendersAddress: {
			id: '',
			line1: '123 Main Road',
			line2: 'Suburb',
			line3: 'City',
			postalCode: '1234',
			userId: ''
		},
		clientId: '',
		client: {
			id: '',
			name: 'Client Name',
			email: '',
			phone: '',
			userId: '',
			createdAt: new Date(),
			updatedAt: new Date(),
			vatNumber: '',
			addressId: '',
			address: {
				id: '',
				line1: '123 Street',
				line2: 'Suburb',
				line3: 'City',
				postalCode: '9876',
				userId: ''
			}
		},
		status: 'PENDING',
		user: {
			id: '',
			name: 'Sender Name',
			email: '',
			username: '',
			avatarUrl: '',
			vatNumber: ''
		},
		yocoCheckoutId: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		lineItems: [
			{
				id: '',
				invoiceId: '',
				description: 'Services Rendered',
				quantity: 1,
				amount: 10_000,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		],
		subtotal: 10_000,
		tax: 0,
		total: 10_000
	};
</script>

<PageHeading heading="Invoice Design" />
<div class="flex h-[70vh] w-full flex-col justify-center gap-4 sm:flex-row">
	<Invoice styles={$form} data={invoice} />
	<ControlPanel bind:form={$form} {enhance} submitting={$submitting} />
</div>
