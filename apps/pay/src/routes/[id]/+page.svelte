<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;

	import { Payfast as PayfastIntegration, Yoco as YocoIntegration } from '@invoicelink/ui/payments';
	import { Avatar, ComboBox, Meta } from '@invoicelink/ui';
	import { getInitials, formatCurrency } from '@invoicelink/lib';

	const isPaid = data.pay?.status === 'PAID';

	// TODO: Edit when adding new integrations
	const integrations: {
		[key: string]: any;
	} = {
		payfast: data.pay?.user?.integrations[0]?.payfast?.[0] ?? undefined,
		yoco: data.pay?.user?.integrations[0]?.yoco?.[0] ?? undefined
	};

	const paymentOptions = Object.keys(integrations)
		.map((key) => {
			if (integrations[key] !== undefined) {
				return {
					value: key,
					label: key
				};
			}
		})
		.filter((option) => option !== undefined);

	let selectedPaymentOption = paymentOptions?.[0] ?? [];

	console.log($page.data);
</script>

<svelte:head>
	<Meta
		title="Pay Now"
		description={`${data.pay?.user.name} is requesting a payment.`}
		imageUrl="https://pay.invoicelink.io/og-image.png"
	/>
</svelte:head>

<div class="flex h-svh w-full flex-col pb-20">
	{#if data.pay}
		<div
			class="bg-pattern bg-base-200 relative flex h-[25vh] w-full flex-col items-center justify-center text-center"
		>
			<div
				class="bg-base-100 absolute bottom-0 z-10 -mb-[10vh] flex h-auto w-[90vw] flex-col items-center justify-center gap-4 rounded-xl p-10 shadow-lg sm:mx-auto sm:w-full sm:max-w-xl"
			>
				<div class="flex flex-col items-center">
					<div class="-mt-4 mb-4">
						<Avatar
							size="size-10"
							avatarUrl={data.pay?.user.avatarUrl ?? undefined}
							placeholder={getInitials(data.pay?.user.name || 'No username')}
						/>
					</div>

					<span class="text-sm font-semibold uppercase">{data.pay?.user.name}</span>
					{#if isPaid}
						<span class="text-sm leading-none">has been paid</span>
					{:else}
						<span class="text-sm leading-none">requested a payment of</span>
					{/if}
				</div>
				<p class="w-full text-center text-3xl font-bold sm:text-5xl md:text-7xl">
					{formatCurrency(data.pay?.total, $page.data.locale, $page.data.currency)}
				</p>
			</div>
		</div>
		<div class="mt-[10vh] flex w-full flex-grow items-center justify-center gap-2 py-10">
			<a
				href="https://api.invoicelink.io/invoice?id={data?.pay.id}&type={data.type}&download=true"
				class="btn w-36">Save invoice</a
			>
			{#if !isPaid}
				{#if integrations.payfast && selectedPaymentOption.value === 'payfast'}
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
						buttonClass="btn btn-pay-now"
						buttonLabel="Pay now"
					/>
				{:else if integrations.yoco && selectedPaymentOption.value === 'yoco'}
					<YocoIntegration
						checkoutId={data.pay?.yocoCheckoutId ?? undefined}
						publicKey={data.pay?.user.integrations[0].yoco[0].publicKey}
						secretKey={data.pay?.user.integrations[0].yoco[0].secretKey}
						amount={data.pay?.total}
						itemName={data.pay.user.name || 'Payment request'}
						buttonClass="btn btn-pay-now"
						buttonLabel="Pay now"
						openInNewTab={false}
					/>
				{/if}
			{/if}
		</div>
		{#if paymentOptions && paymentOptions.length > 0}
			{#if !isPaid}
				<div class="mx-auto flex w-full max-w-xs flex-col items-center justify-end gap-y-2 pt-10">
					<p class="text-sm">Change payment option</p>
					<ComboBox name="gateway" bind:selected={selectedPaymentOption} items={paymentOptions} />
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
