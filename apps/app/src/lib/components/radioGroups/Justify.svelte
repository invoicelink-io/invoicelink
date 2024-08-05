<!-- <script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import Icon from '../Icon.svelte';
	export let align = 'text-left';
	export let disableCenter = false;
</script>

<RadioGroup
	border="border-none"
	background="bg-surface-100-800-token"
	active="bg-primary-500 text-surface-50"
	padding="p-1"
>
	<RadioItem bind:group={align} name="justify" title="justify left" value={'text-left'}>
		<Icon name="bars-3-bottom-left" />
	</RadioItem>
	{#if !disableCenter}
		<RadioItem bind:group={align} name="justify" title="justify center" value={'text-center'}>
			<Icon name="bars-3-bottom-center" />
		</RadioItem>
	{/if}
	<RadioItem bind:group={align} name="justify" title="justify right" value={'text-right'}
		><Icon name="bars-3-bottom-right" /></RadioItem
	>
</RadioGroup> -->

<script lang="ts">
	import Icon from '../Icon.svelte';
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
