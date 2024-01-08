<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Address from '$lib/components/invoice/Address.svelte';
	import IssueDate from '$lib/components/invoice/IssueDate.svelte';
	import Heading from '$lib/components/invoice/Heading.svelte';
	import ColumnHeadings from '$lib/components/invoice/ColumnHeadings.svelte';
	import Spacer from '$lib/components/invoice/Spacer.svelte';
	import LineItem from '$lib/components/invoice/LineItem.svelte';
	import Total from '$lib/components/invoice/Total.svelte';
	import Logo from '$lib/components/invoice/Logo.svelte';
	import type { InvoiceStyles } from '@prisma/client';
	import type { FullInvoice } from '$lib/types';

	export let editable: boolean = false;
	export let styles: InvoiceStyles;
	export let data: FullInvoice;

	export let tax: number = 0;

	$: {
		data.subtotal = parseFloat(
			data.lineItems
				.reduce((acc, item) => {
					return acc + item.amount;
				}, 0)
				.toFixed(2)
		);

		data.tax = parseFloat(((data.subtotal * tax) / 100).toFixed(2));

		data.total = parseFloat((data.subtotal + data.tax).toFixed(2));
	}
</script>

<div
	id="invoice_template"
	class={twMerge('bg-surface-50-900-token h-max w-full flex-grow rounded-lg', styles.baseFontSize)}
>
	<div class="w-full p-10">
		<div class="flex justify-between leading-6">
			<Logo data={{ alt: styles.logoAlt, src: styles.logoSrc ?? undefined }} />
			<Heading
				data={{
					serial: data.serial
				}}
				size={styles.invoiceTypeFontSize}
				text={styles.invoiceType}
				color={styles.invoiceTypeColor}
				casing={styles.invoiceTypeCasing}
			/>
		</div>
		<Spacer divider={'hidden'} spacing={styles.baseSpacing} color={styles.baseDividerColor} />
		<div class="grid grid-cols-1 leading-6">
			<IssueDate align={styles.issueDateAlign} date={new Date()} />
			<Spacer
				divider={styles.baseDivider}
				spacing={styles.baseSpacing}
				color={styles.baseDividerColor}
			/>
			<div class="flex gap-x-4">
				<Address
					name={data.user.name ?? ''}
					data={data.sendersAddress}
					align={styles.senderAddressAlign}
				/>
				<Address
					name={data.client.name}
					data={data.client.address}
					align={styles.recipientAddressAlign}
				/>
			</div>
		</div>
		<Spacer
			divider={styles.baseDivider}
			spacing={styles.baseSpacing}
			color={styles.baseDividerColor}
		/>
		<table class="w-full whitespace-nowrap text-left leading-6">
			<ColumnHeadings
				size={styles.columnHeadingSize}
				color={styles.columnHeadingColor}
				divider={styles.columnHeadingDivider}
				casing={styles.columnHeadingCasing}
				dividerColor={styles.baseDividerColor}
			/>
			<tbody>
				{#each data.lineItems as lineItem}
					<LineItem
						{editable}
						bind:amount={lineItem.amount}
						bind:description={lineItem.description}
						bind:quantity={lineItem.quantity}
						divider={styles.lineItemDivider}
						dividerColor={styles.baseDividerColor}
						lineItemFontSize={styles.baseFontSize}
					/>
				{/each}
			</tbody>
			<Spacer divider={'hidden'} spacing={styles.baseSpacing} color={styles.baseDividerColor} />
			<Total invoiceType={styles.invoiceType} {data} />
		</table>
	</div>
</div>
