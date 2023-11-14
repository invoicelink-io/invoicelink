<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
	// get payment integrations
	const payfast = data.pay.user.Integration.payfast;
	console.log(payfast);
</script>

<svelte:head>
	<title>Payments</title>
</svelte:head>

<div
	class="flex h-screen w-full flex-col items-center justify-between border-t-8 border-primary-500 bg-surface-50 py-8 text-surface-900"
>
	<div class="my-8 flex w-full flex-col items-center text-center">
		<span class="text-sm font-semibold uppercase">{data.pay.user.name}</span>
		<span class="text-sm">requested a payment of</span>
		<p class="h1 w-full py-20 text-center font-bold">
			{Number(data.pay.amount).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
		</p>
	</div>
	<div class="flex h-full w-full flex-col items-center justify-center bg-purple-200">
		{#if payfast}
			<div>Payfast enabled</div>
		{/if}
	</div>
	<div class="text-xs">
		Powered by <a href="https://invoicelink.io" target="_blank">invoicelink.io</a>
	</div>
</div>
