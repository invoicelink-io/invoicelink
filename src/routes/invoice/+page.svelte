<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="w-full p-10">
	<div class="flex justify-between text-lg font-semibold leading-6 text-gray-900">
		<h2>Quick Link</h2>
		<h2>Invoice</h2>
	</div>
	<div class="flex justify-between">
		<p class="text-xs font-medium">powered by invoicelink.io</p>
		<p class="text-xs font-medium">{data.data?.serial}</p>
	</div>
	<dl class="mt-6 grid grid-cols-1 text-sm leading-6">
		<div class="sm:pr-4">
			<dt class="inline text-gray-500">Issued on</dt>
			<dd class="inline text-gray-700">
				<time datetime={data.data?.createdAt.toDateString()}
					>{data.data?.createdAt.toLocaleDateString('en-ZA', {
						month: 'long',
						day: 'numeric',
						year: 'numeric'
					})}</time
				>
			</dd>
		</div>
		<div class="mt-2 sm:mt-0 sm:pl-4"></div>
		<div class="mt-8 text-right sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
			<span class="font-medium text-gray-900">{data.data?.user.name}</span>
			<br />
			{data.data?.user.address[0].line1}
			<br />
			{data.data?.user.address[0].line2}
			<br />
			{data.data?.user.address[0].line3}
			<br />
			{data.data?.user.address[0].postalCode}
		</div>
	</dl>
	<table class="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
		<colgroup>
			<col class="w-full" />
			<col />
			<col />
			<col />
		</colgroup>
		<thead class="border-b border-gray-200 text-gray-900">
			<tr>
				<th scope="col" class="px-0 py-3 font-semibold">Description</th>
				<th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"></th>
				<th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
					>Quantity</th
				>
				<th scope="col" class="py-3 pl-8 pr-0 text-right font-semibold">Amount</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-100">
				<td class="max-w-0 px-0 py-5 align-top">
					<div class="truncate text-gray-500">{data.data?.description ?? 'Services rendered'}</div>
				</td>
				<td
					class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"
				></td>
				<td
					class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"
					>1</td
				>
				<td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700"
					>{data.data?.amount.toLocaleString('en-ZA', {
						style: 'currency',
						currency: 'ZAR'
					})}</td
				>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th scope="row" class="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">Subtotal</th>
				<th
					scope="row"
					colspan="3"
					class="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
					>Subtotal</th
				>
				<td class="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900"
					>{data.data?.amount.toLocaleString('en-ZA', {
						style: 'currency',
						currency: 'ZAR'
					})}</td
				>
			</tr>
			<tr>
				<th scope="row" class="pt-4 font-normal text-gray-700 sm:hidden">Tax</th>
				<th
					scope="row"
					colspan="3"
					class="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell">Tax</th
				>
				<td class="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900"
					>{Number(0).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}</td
				>
			</tr>
			<tr>
				<th scope="row" class="pt-4 font-semibold text-gray-900 sm:hidden">Total</th>
				<th
					scope="row"
					colspan="3"
					class="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell">Total</th
				>
				<td class="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900"
					>{data.data?.amount.toLocaleString('en-ZA', {
						style: 'currency',
						currency: 'ZAR'
					})}</td
				>
			</tr>
		</tfoot>
	</table>
</div>
