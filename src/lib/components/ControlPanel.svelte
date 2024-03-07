<script lang="ts">
	import type { InvoiceStyles } from '@prisma/client';
	export let form: InvoiceStyles;
	export let enhance: any;
	export let submitting: 'create' | 'update' | 'delete' | null;
	const formKeys = Object.keys(form) as (keyof typeof form)[];

	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import InvoiceType from '$lib/components/radioGroups/InvoiceType.svelte';
	import Size from '$lib/components/radioGroups/Size.svelte';
	import Justify from '$lib/components/radioGroups/Justify.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import Casing from './radioGroups/Casing.svelte';
	import Spacing from './radioGroups/Spacing.svelte';
	import Divider from './radioGroups/Divider.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<aside id="invoice_controls" class="flex w-full flex-col gap-2 px-2">
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<label for="template_name" class="text-left text-xs font-normal">Template Name</label>
		<input
			type="text"
			class="input-primary"
			placeholder="e.g. invoicelink"
			required
			bind:value={form.name}
		/>
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<label for="logo" class="text-left text-xs font-normal">Logo</label>
		<input
			type="text"
			placeholder="Logo Alt Text"
			class="input-primary"
			bind:value={form.logoAlt}
		/>
		<ImageUpload bind:src={form.logoSrc} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Invoice Type</p>
		<InvoiceType bind:type={form.invoiceType} />
		<Size bind:size={form.invoiceTypeFontSize} />
		<Casing bind:casing={form.invoiceTypeCasing} />
		<ColorPicker bind:color={form.invoiceTypeColor} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Font</p>
		<Size bind:size={form.baseFontSize} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Dividers</p>
		<Spacing bind:spacing={form.baseSpacing} />
		<Divider bind:divider={form.baseDivider} />
		<ColorPicker bind:color={form.baseDividerColor} />
	</div>

	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Issue Date</p>
		<Justify disableCenter bind:align={form.issueDateAlign} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Sender Address</p>
		<Justify disableCenter bind:align={form.senderAddressAlign} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Recipient Address</p>
		<Justify disableCenter bind:align={form.recipientAddressAlign} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Column Headings</p>
		<Size bind:size={form.columnHeadingSize} />
		<Casing bind:casing={form.columnHeadingCasing} />
		<Divider bind:divider={form.columnHeadingDivider} />
		<ColorPicker bind:color={form.columnHeadingColor} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Line items</p>
		<Divider bind:divider={form.lineItemDivider} />
	</div>
	<div class="mb-4 flex w-full flex-col items-start justify-start gap-2">
		<p class="text-left text-xs font-normal">Bank Details</p>
		<Justify disableCenter bind:align={form.bankDetailsAlign} />
	</div>
	<form method="POST" class="flex justify-end gap-x-2" action="?/create" use:enhance>
		{#each formKeys as key}
			<input type="hidden" name={key} value={form[key]} />
		{/each}
		{#if form.id}
			<Button
				formaction="?/delete"
				variant="variant-filled-error"
				width="w-full"
				loading={submitting === 'delete'}
				label="Delete"
				loadingLabel="Deleting"
			/>
			<Button
				formaction="?/update"
				variant="variant-filled-primary"
				width="w-full"
				loading={submitting === 'update'}
				label="Update"
				loadingLabel="Updating"
			/>
		{:else}
			<Button
				formaction="?/create"
				variant="variant-filled-primary"
				width="w-full"
				loading={submitting === 'create'}
				label="Create"
				loadingLabel="Creating"
			/>
		{/if}
	</form>
</aside>
