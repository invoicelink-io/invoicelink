<script lang="ts">
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
</RadioGroup>
