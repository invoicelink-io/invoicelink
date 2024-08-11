<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let loading: boolean = false;
	export let formaction: string;
	export let variant: 'btn-primary' | 'btn-ghost' | 'btn-error' | 'btn-accent' = 'btn-primary';
	export let label: string = 'Create';
	export let loadingLabel: string = 'Creating';
	export let type: 'submit' | 'button' = 'submit';
	export let width: 'w-full' | 'w-max' = 'w-max';
</script>

<button
	disabled={loading}
	{type}
	{formaction}
	class={twMerge('btn btn-sm gap-2 text-xs', variant, width)}
>
	{#if loading}
		<span class="loading loading-spinner loading-xs"></span>
	{/if}
	{loading ? loadingLabel : label}
</button>
