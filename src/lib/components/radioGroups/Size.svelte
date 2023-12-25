<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	export let size = 'text-base';
</script>

<div class="w-full">
	<RadioGroup
		border="border-none"
		background="bg-surface-100-800-token"
		active="bg-primary-500 text-surface-50"
		display="flex"
	>
		<RadioItem bind:group={size} name="size" title="font size x-small" value={'text-xs'}>
			<span class="text-xs">xs</span>
		</RadioItem>
		<RadioItem bind:group={size} name="size" title="font size small" value={'text-sm'}>
			<span class="text-xs">sm</span>
		</RadioItem>
		<RadioItem bind:group={size} name="size" title="font size medium" value={'text-base'}>
			<span class="text-xs">md</span>
		</RadioItem>
		<RadioItem bind:group={size} name="size" title="font size large" value={'text-lg'}>
			<span class="text-xs">lg</span>
		</RadioItem>
		<RadioItem bind:group={size} name="size" title="font size x-large" value={'text-xl'}>
			<span class="text-xs">xl</span>
		</RadioItem>
	</RadioGroup>
</div>
