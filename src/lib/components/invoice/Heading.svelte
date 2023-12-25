<script lang="ts">
	import { twJoin } from 'tailwind-merge';
	export let text = 'Invoice';
	export let data = {
		serial: 'INV-2023-00001'
	};
	export let size = 'text-base';
	export let color = '#000000';
	export let casing = 'capitalize';
</script>

<div class="w-full text-right">
	<h2 class={twJoin('font-medium', size, casing)} style="color: {color};">{text}</h2>
	<p class="font-medium">{data?.serial}</p>
</div>
