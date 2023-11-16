<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import PayfastIntegration from '../(app)/integrations/payfast/PayfastIntegration.svelte';
	const payfast = data.pay?.user.Integration[0].payfast[0];

	let selectedGateway: string = 'payfast';
	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'top',
		closeQuery: '.listbox-item'
	};
</script>

<svelte:head>
	<title>Pay Now</title>
	<meta charset="UTF-8" />
	<meta name="description" content="{data.pay?.user.name} is requesting a payment." />
	<meta name="viewport" content="width=device-width" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<!-- open graph tags -->
	<meta property="og:title" content="Pay now" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://invoicelink.io" />
	<meta property="og:image" content="https://invoicelink.io/og-image.png" />
	<!-- optional open graph tags -->
	<meta property="og:description" content="Pay now" />
	<meta property="og:site_name" content="InvoiceLink" />
	<meta property="og:locale" content="en_ZA" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- twitter content -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@invoicelink" />
</svelte:head>

<div
	class="flex h-screen w-full flex-col items-center justify-between border-t-8 border-primary-500 bg-surface-50 pb-10 text-surface-900"
>
	{#if data.pay}
		<div
			class="relative flex h-[30vh] w-full flex-col items-center justify-center bg-surface-100 text-center"
		>
			<div
				class="absolute bottom-0 mx-auto -mb-20 max-w-xl rounded-xl bg-surface-50 px-8 py-16 shadow-lg"
			>
				<div class="flex flex-col">
					<span class="text-sm font-semibold uppercase">{data.pay?.user.name}</span>
					<span class="text-sm">requested a payment of</span>
				</div>
				<p class="w-full text-center text-5xl font-bold md:text-7xl">
					{Number(data.pay?.amount).toLocaleString('en-ZA', {
						style: 'currency',
						currency: 'ZAR'
					})}
				</p>
			</div>
		</div>
		<div class="flex w-full flex-grow items-center justify-center">
			{#if payfast && selectedGateway === 'payfast'}
				<PayfastIntegration
					merchant_id={payfast.merchant_id}
					merchant_key={payfast.merchant_key}
					passphrase={payfast.passphrase}
					amount={data.pay?.amount}
					item_name={data.pay.user.name || 'Payment request'}
					requireSecurity={payfast.passphrase !== ''}
				/>
			{/if}
		</div>
		<div class="flex w-full flex-col items-center justify-start gap-y-2 py-4">
			<p class="text-sm">Change payment option</p>
			<button class="variant-glass-surface btn w-48 justify-between" use:popup={popupCombobox}>
				<span class="w-full text-center capitalize">{selectedGateway ?? 'Trigger'}</span>
			</button>
			<div class="card w-48 py-2 shadow-xl" data-popup="popupCombobox">
				<ListBox rounded="rounded-lg" active="variant-glass-surface" padding="mx-2 p-2">
					<ListBoxItem bind:group={selectedGateway} name="payfast" value="payfast">
						Payfast
					</ListBoxItem>
				</ListBox>
			</div>
		</div>
	{:else}
		<div class="flex h-full flex-col items-center justify-center text-center">
			<p>This payment link is invalid or no longer available.</p>
			<a href="https://invoicelink.io">Go to home page</a>
		</div>
	{/if}
	<div class="text-xs">
		<a href="https://invoicelink.io" target="_blank">invoicelink.io</a>
	</div>
</div>
