<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	export let casing = 'text-base';
</script>

<div class="w-full">
	<RadioGroup
		border="border-none"
		background="bg-surface-100-800-token"
		active="bg-primary-500 text-surface-50"
		display="flex"
	>
		<RadioItem bind:group={casing} name="casing" title="uppercase" value={'uppercase'}>
			<span class="text-xs">uppercase</span>
		</RadioItem>
		<RadioItem bind:group={casing} name="casing" title="capitalize" value={'capitalize'}>
			<span class="text-xs">capitalize</span>
		</RadioItem>
		<RadioItem bind:group={casing} name="casing" title="lowercase" value={'lowercase'}>
			<span class="text-xs">lowercase</span>
		</RadioItem>
	</RadioGroup>
</div>
