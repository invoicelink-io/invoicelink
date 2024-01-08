<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';

	import Invoice from '$lib/components/Invoice.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';

	import { RangeSlider } from '@skeletonlabs/skeleton';
	import {
		defaultAddress,
		defaultClient,
		defaultLineItem,
		defaultStyles
	} from '$lib/utils/defaults';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import { Status, type Address, type Client, type InvoiceStyles } from '@prisma/client';
	import Alert from '$lib/components/invoice/Alert.svelte';
	import Button from '$lib/components/Button.svelte';

	import CopyToClipboard from '$lib/components/ui/CopyToClipboard.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Badge from '$lib/components/Badge.svelte';

	// form
	let submitting: 'create' | 'update' | 'delete' | null = null;
	const { form, enhance, message } = superForm(data.form, {
		dataType: 'json',
		onSubmit: ({ action }) => {
			if (action.search.includes('?/delete')) {
				submitting = 'delete';
			} else if (action.search.includes('?/update')) {
				submitting = 'update';
			} else {
				submitting = 'create';
			}
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid invoice');
			}
			submitting = null;
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
			submitting = null;
		}
	});

	// default values
	let tax = parseInt(((100 * $form.tax) / $form.subtotal).toFixed(0)) ?? 15;
	let styles: InvoiceStyles = defaultStyles;

	// dropdown options
	const templates = data.user?.invoiceStyles.map((item) => {
		return { value: item.id, label: item.name };
	}) ?? [{ value: defaultStyles.id, label: defaultStyles.name }];

	const clients = data.user?.client.map((item) => {
		return { value: item.id, label: item.name };
	}) ?? [{ value: defaultClient.id, label: defaultClient.name }];

	$: {
		styles =
			data.user?.invoiceStyles.find((item) => item.id === $form.invoiceStyleId) ?? defaultStyles;
	}

	$: {
		$form.client = data.user?.client.find((item) => item.id === $form.clientId) ?? {
			...defaultClient,
			address: defaultAddress
		};
	}
</script>

<PageHeading heading="{$form.id === '' ? `New` : `Manage`} Invoice">
	{#if $form.id}
		<div class="flex items-center justify-start gap-2">
			<Badge status={$form.status} />
			<a title="Preview invoicelink" target="_blank" href="/pay?id={$form.id}">
				<Icon name="launch" />
			</a>
			<a
				title="Save a copy"
				target="_blank"
				href="/api/invoice?id={$form.id}&type=invoice&download=true"
			>
				<Icon name="document-download" />
			</a>
			<CopyToClipboard
				text={`${$page.url.origin}/pay?id=${$form.id}`}
				message="Invoicelink copied"
			/>
		</div>
	{/if}
</PageHeading>

<Alert />

{#if data.user}
	<div class="relative flex h-[70vh] w-full flex-col gap-4 lg:flex-row">
		<div
			class="border-surface-100-800-token hide-scrollbar flex-grow rounded-lg border lg:overflow-y-scroll"
		>
			<Invoice {styles} {tax} bind:data={$form} editable />
		</div>
		<div class="hide-scrollbar min-w-[25%] pb-8 lg:overflow-y-scroll lg:pb-0">
			<form method="post" class="relative flex flex-col gap-y-4" action="?/create" use:enhance>
				<span>
					<label class="label-primary" for="description">Description</label>
					<input
						name="description"
						type="text"
						class="input-primary"
						placeholder="Invoice description"
						disabled={$form.status === Status.PAID}
					/>
				</span>

				<span>
					<label class="label-primary" for="templates">Template</label>
					<Dropdown
						targetName="templateDropdown"
						options={templates}
						disabled={$form.status === Status.PAID}
						placeholder={'Select a template'}
						bind:selected={$form.invoiceStyleId}
					/>
				</span>

				<span>
					<label class="label-primary" for="clients">Client</label>
					<Dropdown
						targetName="clientDropdown"
						options={clients}
						placeholder={'Select a client'}
						disabled={$form.status === Status.PAID}
						bind:selected={$form.clientId}
					/>
				</span>

				{#if $form.status !== Status.PAID}
					<div class="flex w-full gap-2">
						<button
							type="button"
							class="variant-soft-surface btn btn-sm w-full"
							on:click={() => {
								if ($form.lineItems.length > 0) {
									// delete the last item
									$form.lineItems = $form.lineItems.slice(0, -1);
								} else {
									$form.lineItems = [{ ...defaultLineItem }];
								}
							}}>Remove line item</button
						>
						<button
							type="button"
							on:click={() => {
								$form.lineItems = [...$form.lineItems, { ...defaultLineItem }];
							}}
							class="variant-soft-surface btn btn-sm w-full">Add line item</button
						>
					</div>

					<RangeSlider name="range-slider" bind:value={tax} max={100} step={1}>
						<div class="flex items-center justify-between">
							<div class="label text-xs">Tax</div>
							<div class="text-xs">{tax}%</div>
						</div>
					</RangeSlider>

					<div class="flex w-full gap-2">
						{#if $form.id}
							<Button
								formaction="?/delete"
								variant="variant-filled-error"
								loading={submitting === 'delete'}
								label="Delete"
								loadingLabel="Deleting"
								width="w-full"
							/>
							<Button
								formaction="?/update"
								variant="variant-filled-primary"
								loading={submitting === 'update'}
								label="Update"
								loadingLabel="Updating"
								width="w-full"
							/>
						{:else}
							<Button
								formaction="?/create"
								variant="variant-filled-primary"
								loading={submitting === 'create'}
								label="Create"
								loadingLabel="Creating"
								width="w-full"
							/>
						{/if}
					</div>
				{/if}
			</form>
		</div>
	</div>
{/if}
