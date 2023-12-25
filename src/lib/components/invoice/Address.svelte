<script lang="ts">
	import type { Address } from '@prisma/client';
	import { twMerge } from 'tailwind-merge';
	export let name: string;
	export let data: Address;
	export let align = 'text-left';
</script>

<div class={twMerge('w-full', align)}>
	<span class="font-medium text-gray-900">{name}</span>
	<br />
	{data.line1}
	<br />
	{data.line2 ?? ''}
	<br />
	{data.line3 ?? ''}
	<br />
	{data.postalCode}
</div>
