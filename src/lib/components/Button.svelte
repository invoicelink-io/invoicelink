<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { twMerge } from 'tailwind-merge';

	export let loading: boolean = false;
	export let formaction: string;
	export let variant: 'variant-filled-primary' | 'variant-filled-surface' | 'variant-filled-error' =
		'variant-filled-primary';
	export let label: string = 'Create';
	export let loadingLabel: string = 'Creating';
	export let type: 'submit' | 'button' = 'submit';
</script>

<button disabled={loading} {type} {formaction} class={twMerge('btn btn-sm w-max gap-2', variant)}>
	{#if loading}
		<ProgressRadial class="h-4 w-4" meter="stroke-surface-50" track="stroke-surface-200/30" />
	{/if}
	{loading ? loadingLabel : label}
</button>
