<script lang="ts">
	import Invoice from '$lib/components/Invoice.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import type { InvoiceStyles } from '@prisma/client';
	import type { FullInvoice } from '$lib/types';

	let data: FullInvoice = {
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

	let styles: InvoiceStyles = {
		id: 'test',
		userId: 'test',
		name: '',
		createdAt: new Date(),
		updatedAt: new Date(),
		baseFontSize: 'text-sm',
		baseSpacing: 'py-4',
		baseDivider: 'hidden',
		baseDividerColor: '#e5e7eb',
		issueDateAlign: 'text-right',
		senderAddressAlign: 'text-left',
		recipientAddressAlign: 'text-right',
		invoiceType: 'Invoice',
		invoiceTypeFontSize: 'text-lg',
		invoiceTypeColor: '#000000',
		invoiceTypeCasing: 'capitalize',
		columnHeadingSize: 'text-sm',
		columnHeadingColor: '#000000',
		columnHeadingCasing: 'capitalize',
		columnHeadingDivider: 'hidden',
		columnHeadingDividerColor: '#e5e7eb',
		lineItemDivider: 'solid',
		lineItemDividerColor: '#e5e7eb',
		logoSrc: '',
		logoAlt: 'invoicelink.io'
	};
</script>

<PageHeading heading="Customise Invoice" />
<div class="flex h-full w-full flex-col justify-center gap-4 sm:flex-row">
	<Invoice {styles} {data} />
	<ControlPanel bind:form={styles} />
</div>
