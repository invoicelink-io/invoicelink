<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Address from '$lib/components/invoice/Address.svelte';
	import IssueDate from '$lib/components/invoice/IssueDate.svelte';
	import Heading from '$lib/components/invoice/Heading.svelte';
	import ColumnHeadings from '$lib/components/invoice/ColumnHeadings.svelte';
	import Spacer from '$lib/components/invoice/Spacer.svelte';
	import LineItem from '$lib/components/invoice/LineItem.svelte';
	import Total from '$lib/components/invoice/Total.svelte';
	import { Logo } from '@invoicelink/ui';
	import Banking from './invoice/Banking.svelte';
	import type { InvoiceStyles } from '@prisma/client';
	import type { FullQuickLink } from '$lib/types';

	export let styles: InvoiceStyles;
	export let data: FullQuickLink;
</script>

<div
	data-theme="light"
	id="invoice_template"
	class={twMerge('h-max w-full flex-grow rounded-lg bg-base-100', styles.baseFontSize)}
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
			<IssueDate align={styles.issueDateAlign} />
			<Spacer
				divider={styles.baseDivider}
				spacing={styles.baseSpacing}
				color={styles.baseDividerColor}
			/>
			<div class="flex gap-x-4">
				<Banking data={data.user.bankAccount?.[0]} />
				<Address
					name={data.user.name ?? ''}
					data={data.sendersAddress}
					align={styles.senderAddressAlign}
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
				<LineItem
					amount={data.total}
					description={data.description ?? 'Services rendered'}
					quantity={1}
					divider={styles.lineItemDivider}
					dividerColor={styles.baseDividerColor}
					lineItemFontSize={styles.baseFontSize}
				/>
			</tbody>
			<Spacer divider={'hidden'} spacing={styles.baseSpacing} color={styles.baseDividerColor} />
			<Total invoiceType={styles.invoiceType} {data} />
		</table>
	</div>
</div>
