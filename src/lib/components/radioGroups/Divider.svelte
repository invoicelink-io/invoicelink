<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	export let divider = 'solid';
</script>

<div class="w-full">
	<RadioGroup
		border="border-none"
		background="bg-surface-100-800-token"
		active="bg-primary-500 text-surface-50"
		display="flex"
	>
		<RadioItem bind:group={divider} name="divider" title="hide dividers" value={'hidden'}>
			<span class="text-xs">hidden</span>
		</RadioItem>
		<RadioItem bind:group={divider} name="divider" title="show dividers" value={'solid'}>
			<span class="text-xs">solid</span>
		</RadioItem>
		<RadioItem bind:group={divider} name="divider" title="show dividers" value={'dashed'}>
			<span class="text-xs">dashed</span>
		</RadioItem>
		<RadioItem bind:group={divider} name="divider" title="show dividers" value={'dotted'}>
			<span class="text-xs">dotted</span>
		</RadioItem>
	</RadioGroup>
</div>
