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
	import type { InvoiceStyles } from '@invoicelink/db';
	import type { FullInvoice } from '$lib/types';
	import Banking from './invoice/Banking.svelte';

	export let editable: boolean = false;
	export let styles: InvoiceStyles;
	export let data: FullInvoice;

	$: {
		data.subtotal = parseFloat(
			data.lineItems
				.reduce((acc, item) => {
					return acc + item.amount;
				}, 0)
				.toFixed(2)
		);

		data.tax = parseFloat(((data.subtotal * data.taxPercentage) / 100).toFixed(2));

		data.total = parseFloat((data.subtotal + data.tax).toFixed(2));
	}
</script>

<div
	data-theme="light"
	id="invoice_template"
	class={twMerge('min-h-full w-full flex-grow rounded-lg bg-base-100', styles.baseFontSize)}
>
	<div class="w-full p-4 sm:p-10">
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
			<IssueDate
				{editable}
				align={styles.issueDateAlign}
				date={data.issueDate.toLocaleDateString('en-ZA').replaceAll('/', '-')}
			/>
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
		<div id="table" class="whitespace-nowrap text-left leading-6">
			<ColumnHeadings
				size={styles.columnHeadingSize}
				color={styles.columnHeadingColor}
				divider={styles.columnHeadingDivider}
				casing={styles.columnHeadingCasing}
				dividerColor={styles.baseDividerColor}
			/>
			<div id="table-body" class="flex w-full flex-col">
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
			</div>
			<Spacer divider={'hidden'} spacing={styles.baseSpacing} color={styles.baseDividerColor} />
			<Total invoiceType={styles.invoiceType} {data} />
		</div>
		<Spacer
			divider={styles.baseDivider}
			spacing={styles.baseSpacing}
			color={styles.baseDividerColor}
		/>
		<Banking data={data.user.bankAccount[0]} align={styles.bankDetailsAlign} />
	</div>
</div>
