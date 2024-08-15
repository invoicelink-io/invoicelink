<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let size = 'text-base';
	export let color = '#000000';
	export let divider = 'hidden';
	export let casing = 'capitalize';
	export let dividerColor = '#e5e7eb';
</script>

<div id="table-header" style="border-bottom: 1px {divider} {dividerColor};">
	<div class="grid grid-cols-4">
		<span class={twMerge('py-3 font-semibold', size, casing)} style="color: {color};"
			>Description</span
		>
		<span class={twMerge('py-3 text-right font-semibold', size, casing)} style="color: {color};">
			Price
		</span>
		<span class={twMerge('py-3 text-right font-semibold', size, casing)} style="color: {color};">
			Quantity
		</span>
		<span class={twMerge('py-3 text-right font-semibold', size, casing)} style="color: {color};"
			>Total</span
		>
	</div>
</div>
