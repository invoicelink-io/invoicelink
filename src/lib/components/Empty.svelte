<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let title: string = 'Nothing to see here';
	export let subtitle: string = 'Get started by creating a new quick link';
	export let hideBorder: boolean = false;
</script>

<div
	class={twMerge(
		`flex h-full min-h-[10rem] w-full flex-col items-center justify-center rounded-lg bg-transparent p-4 text-center`,
		`${hideBorder ? '' : 'border-surface-200-700-token border border-dashed'}`
	)}
>
	<h3 class="mt-2 text-sm font-semibold">{title}</h3>
	<p class="text-surface-400-500-token mt-1 text-sm">{subtitle}</p>
</div>
