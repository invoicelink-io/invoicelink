<script lang="ts">
	import type { Address } from '@prisma/client';
	import { twMerge } from 'tailwind-merge';
	export let name: string;
	export let data: Address;
	export let align = 'text-left';
</script>

<div class={twMerge('flex w-full flex-col leading-5', align)}>
	<span>{name}</span>
	<span>{data.line1}</span>
	<span>{data.line2 ?? ''}</span>
	<span>{data.line3 ?? ''}</span>
	<span>{data.postalCode}</span>
</div>
