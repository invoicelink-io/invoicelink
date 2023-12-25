<script lang="ts">
	import { twJoin } from 'tailwind-merge';
	export let size = 'text-base';
	export let divider = 'solid';
	export let spacing = 'py-2';
	export let color = '#e5e7eb';
</script>

<div class={twJoin('w-full', size, spacing)}>
	{#if divider !== 'hidden'}
		<hr class="block h-[1px] border-0" style="border-top: 1px {divider} {color};" />
	{/if}
</div>
