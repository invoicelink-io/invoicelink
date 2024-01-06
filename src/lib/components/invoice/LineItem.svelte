<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let editable: boolean = false;
	export let divider = 'solid';
	export let dividerColor = '#e5e7eb';
	export let lineItemFontSize = 'text-sm';

	export let description: string = 'Services rendered';
	export let quantity: number = 1;
	export let amount: number = 10;
</script>

<tr class="group" style="border-bottom: 1px {divider} {dividerColor}">
	<td class="max-w-0 py-2 align-top">
		<input
			class={twMerge('input-invoice w-full text-left', lineItemFontSize, 'w-60 hover:w-60')}
			type="text"
			placeholder="Description"
			disabled={!editable}
			bind:value={description}
		/>
	</td>
	<td class="hidden py-2 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell"></td>
	<td class="hidden py-2 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="number"
			min="1"
			disabled={!editable}
			placeholder="Quantity"
			bind:value={quantity}
		/>
	</td>
	<td class="table-cell py-2 pl-8 pr-0 text-right align-top tabular-nums group-hover:hidden">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="text"
			value={amount.toLocaleString('en-ZA', {
				style: 'currency',
				currency: 'ZAR'
			})}
		/>
	</td>
	<td class="hidden py-2 pl-8 pr-0 text-right align-top tabular-nums group-hover:table-cell">
		<input
			class={twMerge('input-invoice text-right', lineItemFontSize)}
			type="number"
			step="0.01"
			min="1"
			placeholder="Quantity"
			disabled={!editable}
			bind:value={amount}
		/>
	</td>
</tr>
