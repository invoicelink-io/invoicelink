<script lang="ts">
	export let divider = 'solid';
	export let dividerColor = '#e5e7eb';
	export let data: {
		description: string;
		quantity: number;
		amount: number;
	};
</script>

<tr style="border-bottom: 1px {divider} {dividerColor}">
	<td class="max-w-0 px-0 py-5 align-top">
		<div class="truncate">
			{data?.description ?? 'Services rendered'}
		</div>
	</td>
	<td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell"></td>
	<td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums sm:table-cell"
		>{data?.quantity ?? 1}</td
	>
	<td class="py-5 pl-8 pr-0 text-right align-top tabular-nums"
		>{data?.amount.toLocaleString('en-ZA', {
			style: 'currency',
			currency: 'ZAR'
		})}</td
	>
</tr>
