<script lang="ts">
	import type { Invoice, QuickLink } from '@prisma/client';

	export let data: Invoice | QuickLink;
	export let invoiceType: string = 'Invoice';
</script>

<div id="table-footer" class="grid grid-cols-3 sm:grid-cols-4">
	<div class="col-span-2 flex flex-col items-end gap-y-2 sm:col-span-3">
		<span class="font-normal">Subtotal</span>
		<span class="font-normal">{invoiceType === 'VAT Invoice' ? `VAT` : `Tax`}</span>
		<span class="font-semibold">Total</span>
	</div>
	<div class="flex flex-col gap-y-2">
		<span class="truncate text-right tabular-nums"
			>{data?.subtotal.toLocaleString('en-ZA', {
				style: 'currency',
				currency: 'ZAR'
			})}</span
		>
		<span class="truncate text-right tabular-nums"
			>{data?.tax.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}</span
		>
		<span class="truncate text-right font-semibold tabular-nums"
			>{data?.total.toLocaleString('en-ZA', {
				style: 'currency',
				currency: 'ZAR'
			})}</span
		>
	</div>
</div>
