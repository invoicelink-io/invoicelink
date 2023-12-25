<script lang="ts">
	import type { Invoice } from '@prisma/client';

	export let data: Invoice;
	export let invoiceType: string = 'Invoice';
</script>

<tfoot>
	<tr>
		<th scope="row" class="px-0 pb-0 pt-6 font-normal sm:hidden">Subtotal</th>
		<th scope="row" colspan="3" class="hidden px-0 pb-0 pt-6 text-right font-normal sm:table-cell"
			>Subtotal</th
		>
		<td class="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums"
			>{data?.subtotal.toLocaleString('en-ZA', {
				style: 'currency',
				currency: 'ZAR'
			})}</td
		>
	</tr>
	<tr>
		<th scope="row" class="pt-4 font-normal sm:hidden">Tax</th>
		<th scope="row" colspan="3" class="hidden pt-4 text-right font-normal sm:table-cell"
			>{invoiceType === 'VAT Invoice' ? `VAT` : `Tax`}</th
		>
		<td class="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums"
			>{data?.tax.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}</td
		>
	</tr>
	<tr>
		<th scope="row" class="pt-4 font-semibold sm:hidden">Total</th>
		<th scope="row" colspan="3" class="hidden pt-4 text-right font-semibold sm:table-cell">Total</th
		>
		<td class="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums"
			>{data?.total.toLocaleString('en-ZA', {
				style: 'currency',
				currency: 'ZAR'
			})}</td
		>
	</tr>
</tfoot>
