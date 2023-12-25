<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	export let type = 'Invoice';
</script>

<div class="w-full">
	<RadioGroup
		border="border-none"
		background="bg-surface-100-800-token"
		active="bg-primary-500 text-surface-50"
		display="flex"
	>
		<RadioItem bind:group={type} name="invoiceType" title="Invoice" value={'Invoice'}>
			<span class="text-xs">invoice</span>
		</RadioItem>
		<RadioItem bind:group={type} name="invoiceType" title="Tax Invoice" value={'Tax Invoice'}>
			<span class="text-xs">tax</span>
		</RadioItem>
		<RadioItem bind:group={type} name="invoiceType" title="VAT Invoice" value={'VAT Invoice'}>
			<span class="text-xs">vat</span>
		</RadioItem>
		<RadioItem bind:group={type} name="invoiceType" title="Quote" value={'Quote'}>
			<span class="text-xs">quote</span>
		</RadioItem>
	</RadioGroup>
</div>
