<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';

	import Invoice from '$lib/components/Invoice.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';

	import {
		defaultAddress,
		defaultClient,
		defaultLineItem,
		defaultStyles
	} from '$lib/utils/defaults';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import { type InvoiceStyles } from '@prisma/client';
	import Alert from '$lib/components/invoice/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import CopyToClipboard from '$lib/components/CopyToClipboard.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import ComboBox from '$lib/components/ComboBox.svelte';

	// form
	let submitting: 'create' | 'update' | 'delete' | null = null;
	const { form, enhance, message } = superForm(data.form, {
		dataType: 'json',
		resetForm: false,
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

<PageHeading>
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
			<Invoice {styles} bind:data={$form} editable />
		</div>
		<div class="hide-scrollbar min-w-[25%] p-2 pb-8 lg:overflow-y-scroll lg:pb-0">
			<form method="post" class="relative flex flex-col gap-y-2" action="?/create" use:enhance>
				<label class="form-control">
					<div class="label">
						<span class="label-text-alt">Description</span>
					</div>
					<input
						name="description"
						type="text"
						class="input-primary"
						bind:value={$form.description}
						placeholder="Invoice description"
						disabled={$form.status === 'PAID'}
					/>
				</label>

				<ComboBox
					labelText="Templates"
					placeholder="Select a template"
					options={templates}
					bind:value={$form.invoiceStyleId}
				/>
				<ComboBox
					labelText="Clients"
					placeholder="Select a client"
					options={clients}
					bind:value={$form.clientId}
				/>

				{#if $form.status !== 'PAID'}
					<div class="flex w-full flex-col justify-between gap-y-2">
						<button
							type="button"
							class="btn btn-sm btn-block"
							on:click={() => {
								if ($form.lineItems.length > 0) {
									// delete the last item
									$form.lineItems = $form.lineItems.slice(0, -1);
								} else {
									$form.lineItems = [{ ...defaultLineItem }];
								}
							}}
							>Remove line item</button
						>
						<button
							type="button"
							on:click={() => {
								$form.lineItems = [...$form.lineItems, { ...defaultLineItem }];
							}}
							class="btn btn-sm btn-block">Add line item</button
						>
					</div>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text-alt">Tax</span>
							<span class="label-text-alt">{$form.taxPercentage}%</span>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							bind:value={$form.taxPercentage}
							class="range range-accent range-xs"
						/>
					</label>

					<div class="flex w-full flex-col gap-2">
						{#if $form.id}
							<Button
								formaction="?/update"
								variant="btn-primary"
								loading={submitting === 'update'}
								label="Update"
								loadingLabel="Updating"
								width="w-full"
							/>
							<Button
								formaction="?/delete"
								variant="btn-error"
								loading={submitting === 'delete'}
								label="Delete"
								loadingLabel="Deleting"
								width="w-full"
							/>
						{:else}
							<Button
								formaction="?/create"
								variant="btn-primary"
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
