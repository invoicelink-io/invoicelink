<script lang="ts">
	import { page } from '$app/stores';
	import { formatCurrency } from '@invoicelink/lib';
	import { twMerge } from 'tailwind-merge';

	export let editable: boolean = false;
	export let divider = 'solid';
	export let dividerColor = '#e5e7eb';
	export let lineItemFontSize = 'text-sm';

	export let description: string = 'Services rendered';
	export let unitPrice: number = 10;
	export let quantity: number = 1;
	export let amount: number;

	$: {
		amount = unitPrice * quantity;
	}
</script>

<div
	class="group grid grid-cols-4 items-center gap-x-2"
	style="border-bottom: 1px {divider} {dividerColor}"
>
	<div class="w-full py-2">
		<input
			class={twMerge('input-invoice w-full text-left', lineItemFontSize)}
			type="text"
			placeholder="Description"
			disabled={!editable}
			bind:value={description}
		/>
	</div>
	<div class="py-2 text-right tabular-nums group-hover:hidden">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="text"
			placeholder="Price"
			value={unitPrice
				? formatCurrency(unitPrice, $page.data.locale, $page.data.currency)
				: formatCurrency(0, $page.data.locale, $page.data.currency)}
		/>
	</div>
	<div class="hidden py-2 text-right tabular-nums group-hover:table-cell">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="number"
			step="0.01"
			min="1"
			placeholder="Price"
			disabled={!editable}
			bind:value={unitPrice}
		/>
	</div>
	<div class="py-2 text-right tabular-nums">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="number"
			min="1"
			disabled={!editable}
			placeholder="Quantity"
			bind:value={quantity}
		/>
	</div>
	<div class="py-2 text-right tabular-nums">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="text"
			placeholder="Amount"
			disabled
			value={amount
				? formatCurrency(amount, $page.data.locale, $page.data.currency)
				: formatCurrency(0, $page.data.locale, $page.data.currency)}
		/>
	</div>
</div>
