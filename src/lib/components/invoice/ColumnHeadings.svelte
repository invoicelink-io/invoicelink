<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let size = 'text-base';
	export let color = '#000000';
	export let divider = 'hidden';
	export let casing = 'capitalize';
	export let dividerColor = '#e5e7eb';
</script>

<thead style="border-bottom: 1px {divider} {dividerColor};">
	<tr>
		<th scope="col" class={twMerge('px-0 py-3 font-semibold', size, casing)} style="color: {color};"
			>Description</th
		>
		<th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell" />
		<th
			scope="col"
			class={twMerge('hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell', size, casing)}
			style="color: {color};"
		>
			Quantity
		</th>
		<th
			scope="col"
			class={twMerge('py-3 pl-8 pr-0 text-right font-semibold', size, casing)}
			style="color: {color};">Amount</th
		>
	</tr>
</thead>
