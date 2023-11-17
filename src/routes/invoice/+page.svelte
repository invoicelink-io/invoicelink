<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div
	class="-mx-4 px-4 py-8 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16"
>
	<h2 class="text-base font-semibold leading-6 text-gray-900">Invoicelink</h2>
	<dl class="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
		<div class="sm:pr-4">
			<dt class="inline text-gray-500">Issued on</dt>
			<dd class="inline text-gray-700"><time datetime="2023-23-01">January 23, 2023</time></dd>
		</div>
		<div class="mt-2 sm:mt-0 sm:pl-4"></div>
		<div class="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
			<dt class="font-semibold text-gray-900">From</dt>
			<dd class="mt-2 text-gray-500">
				<span class="font-medium text-gray-900">{data.data?.user.name}</span><br />7363 Cynthia Pass<br
				/>Toronto, ON N3Y 4H8
			</dd>
		</div>
		<div class="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
			<dt class="font-semibold text-gray-900">To</dt>
			<dd class="mt-2 text-gray-500">
				<span class="font-medium text-gray-900">Tuple, Inc</span><br />886 Walter Street<br />New
				York, NY 12345
			</dd>
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
				<th scope="col" class="px-0 py-3 font-semibold">Projects</th>
				<th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"></th>
				<th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"></th>
				<th scope="col" class="py-3 pl-8 pr-0 text-right font-semibold">Amount</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-b border-gray-100">
				<td class="max-w-0 px-0 py-5 align-top">
					<div class="truncate font-medium text-gray-900">Quick Link</div>
					<div class="truncate text-gray-500">Quick link payment</div>
				</td>
				<td
					class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"
					>20.0</td
				>
				<td
					class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell"
					>$100.00</td
				>
				<td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$2,000.00</td>
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
				<td class="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">$8,800.00</td>
			</tr>
			<tr>
				<th scope="row" class="pt-4 font-normal text-gray-700 sm:hidden">Tax</th>
				<th
					scope="row"
					colspan="3"
					class="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell">Tax</th
				>
				<td class="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">$1,760.00</td>
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
