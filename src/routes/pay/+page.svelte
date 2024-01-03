<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { ListBox, ListBoxItem, popup, Avatar } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import PayfastIntegration from '$lib/components/integrations/PayfastIntegration.svelte';
	import YocoIntegration from '$lib/components/integrations/YocoIntegration.svelte';
	import { getInitials } from '$lib/utils/stringHelpers';

	const isPaid = data.pay?.status === 'PAID' ?? false;

	const integrations: {
		[key: string]: any;
	} = {
		payfast: data.pay?.user.integrations[0].payfast[0] ?? undefined,
		yoco: data.pay?.user.integrations[0].yoco[0] ?? undefined
	};

	let selectedGateway: string =
		Object.keys(integrations).find((key) => integrations[key] !== undefined) || '';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'top',
		closeQuery: '.listbox-item'
	};
</script>

<svelte:head>
	<title>Pay Now</title>
	<meta name="description" content={`${data.pay?.user.name} is requesting a payment.`} />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<!-- open graph tags -->
	<meta property="og:title" content="Pay now" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://invoicelink.io" />
	<meta property="og:image" content="https://invoicelink.io/og-image.png" />
	<!-- optional open graph tags -->
	<meta property="og:description" content={`${data.pay?.user.name} is requesting a payment.`} />
	<meta property="og:site_name" content="InvoiceLink" />
	<meta property="og:locale" content="en_ZA" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- twitter content -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="invoicelink.io" />
	<meta name="twitter:title" content="Pay Now" />
	<meta name="twitter:description" content={`${data.pay?.user.name} is requesting a payment.`} />
	<meta name="twitter:image" content="https://invoicelink.io/og-image.png" />
</svelte:head>

<div class="flex h-svh w-full flex-col pb-20 text-surface-900">
	{#if data.pay}
		<div
			class="bg-pattern relative flex h-[25vh] w-full flex-col items-center justify-center {isPaid
				? `bg-success-200`
				: `bg-surface-100`}  text-center"
		>
			<div
				class="absolute bottom-0 -mb-[10vh] flex h-auto w-full max-w-sm flex-col items-center justify-center gap-4 rounded-xl bg-surface-50 p-10 shadow-lg sm:mx-auto sm:max-w-xl"
			>
				<div class="flex flex-col items-center">
					<div class="-mt-4 mb-4">
						<Avatar
							src={data.pay?.user.avatarUrl ?? undefined}
							initials={getInitials(data.pay?.user.name || 'No username')}
							width="w-12"
							rounded="rounded-lg"
						/>
					</div>

					<span class="text-sm font-semibold uppercase">{data.pay?.user.name}</span>
					{#if isPaid}
						<span class="text-sm leading-none">has been paid</span>
					{:else}
						<span class="text-sm leading-none">requested a payment of</span>
					{/if}
				</div>
				<p class="w-full text-center text-5xl font-bold md:text-7xl">
					{Number(data.pay?.total).toLocaleString('en-ZA', {
						style: 'currency',
						currency: 'ZAR'
					})}
				</p>
			</div>
		</div>
		<div class="mt-[10vh] flex w-full flex-grow items-center justify-center gap-2 py-10">
			<a
				href="/api/invoice?id={data?.pay.id}&type=quick&download=true"
				class="variant-glass-surface btn w-36">Save invoice</a
			>
			{#if !isPaid}
				{#if integrations.payfast && selectedGateway === 'payfast'}
					<PayfastIntegration
						userId={data.pay.user?.id}
						merchantId={integrations.payfast.merchantId}
						merchantKey={integrations.payfast.merchantKey}
						passphrase={integrations.payfast.passphrase}
						amount={data.pay?.total}
						paymentId={data.pay?.id}
						itemName={data.pay.user.name || 'Payment request'}
						requireSecurity={integrations.payfast.passphrase !== ''}
						demo={data?.pay.id === 'demo'}
						buttonClass="variant-filled-surface btn bg-surface-800-100-token w-36"
						buttonLabel="Pay now"
					/>
				{:else if integrations.yoco && selectedGateway === 'yoco'}
					<YocoIntegration
						checkoutId={data.pay?.yocoCheckoutId ?? undefined}
						publicKey={data.pay?.user.integrations[0].yoco[0].publicKey}
						secretKey={data.pay?.user.integrations[0].yoco[0].secretKey}
						amount={data.pay?.total}
						itemName={data.pay.user.name || 'Payment request'}
						buttonClass="variant-filled-surface btn bg-surface-800-100-token w-36"
						buttonLabel="Pay now"
						openInNewTab={false}
					/>
				{/if}
			{/if}
		</div>
		{#if Object.keys(integrations).length > 0}
			{#if !isPaid}
				<div class="flex w-full flex-col items-center justify-end gap-y-2 pt-10">
					<p class="text-sm">Change payment option</p>
					<button
						class="variant-outline-surface btn w-48 justify-between"
						use:popup={popupCombobox}
					>
						<span class="w-full text-center capitalize">{selectedGateway ?? 'Trigger'}</span>
					</button>
					<div class="card w-48 py-2 shadow-xl" data-popup="popupCombobox">
						<ListBox rounded="rounded-lg" active="variant-glass-surface" padding="mx-2 p-2">
							{#each Object.keys(integrations) as gateway}
								{#if integrations[gateway]}
									<ListBoxItem
										bind:group={selectedGateway}
										name={gateway}
										value={gateway}
										class="capitalize"
									>
										{gateway}
									</ListBoxItem>
								{/if}
							{/each}
						</ListBox>
					</div>
				</div>
			{/if}
		{/if}
	{:else}
		<div class="flex h-full flex-col items-center justify-center text-center">
			<p>This payment link is invalid or no longer available.</p>
			<a href="https://invoicelink.io">Go to home page</a>
		</div>
	{/if}
	<div class="w-full py-10 text-center text-xs">
		<a href="https://invoicelink.io" target="_blank">invoicelink.io</a>
	</div>
</div>

<style>
	.bg-pattern {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2355575e' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
	}
</style>
