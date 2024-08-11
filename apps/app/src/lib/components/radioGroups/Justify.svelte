<script lang="ts">
	import { Icon } from '@invoicelink/ui';
	export let align = 'text-left';
	export let disableCenter = false;
	const options: {
		value: string;
		label: string;
		icon: 'bars-3-bottom-left' | 'bars-3-bottom-center' | 'bars-3-bottom-right';
	}[] = [
		{ value: 'text-left', label: 'justify left', icon: 'bars-3-bottom-left' },
		{ value: 'text-center', label: 'justify center', icon: 'bars-3-bottom-center' },
		{ value: 'text-right', label: 'justify right', icon: 'bars-3-bottom-right' }
	];
</script>

<div class="join">
	{#each options as option}
		{#if option.value === 'text-center' && disableCenter}
			<!-- Do nothing -->
		{:else}
			<button
				class:btn-active={option.value === align}
				class="btn join-item btn-xs"
				type="button"
				on:click={() => {
					align = option.value;
				}}><Icon name={option.icon} /></button
			>
		{/if}
	{/each}
</div>
