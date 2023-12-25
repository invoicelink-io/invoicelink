<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	export let spacing = 'text-base';
</script>

<div class="w-full">
	<RadioGroup
		border="border-none"
		background="bg-surface-100-800-token"
		active="bg-primary-500 text-surface-50"
		display="flex"
	>
		<RadioItem bind:group={spacing} name="spacing" title="spacing 2" value={'py-2'}>
			<span class="text-xs">space 2</span>
		</RadioItem>
		<RadioItem bind:group={spacing} name="spacing" title="spacing 4" value={'py-4'}>
			<span class="text-xs">space 4</span>
		</RadioItem>
		<RadioItem bind:group={spacing} name="spacing" title="spacing 8" value={'py-8'}>
			<span class="text-xs">space 8</span>
		</RadioItem>
	</RadioGroup>
</div>
