<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { dev } from '$app/environment';

	import Invoice from '$lib/components/Invoice.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import CopyToClipboard from '$lib/components/CopyToClipboard.svelte';
	import InvoiceAlert from '$lib/components/invoice/InvoiceAlert.svelte';

	import { type InvoiceStyles } from '@prisma/client';
	import { Button, Icon, Badge, ComboBox } from '@invoicelink/ui';
	import {
		defaultAddress,
		defaultClient,
		defaultLineItem,
		defaultStyles
	} from '@invoicelink/lib/defaults';

	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

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

	let selectedTemplate = templates.find((item) => item.value === $form.invoiceStyleId) ?? {
		value: defaultStyles.id,
		label: defaultStyles.name
	};

	const clients = data.user?.client.map((item) => {
		return { value: item.id, label: item.name };
	}) ?? [{ value: defaultClient.id, label: defaultClient.name }];

	let selectedClient = clients.find((item) => item.value === $form.clientId) ?? {
		value: defaultClient.id,
		label: defaultClient.name
	};

	$: {
		$form.invoiceStyleId = selectedTemplate.value;
		if (selectedTemplate.value == '') {
			$form.invoiceStyleId = null;
		}
		styles =
			data.user?.invoiceStyles.find((item) => item.id === $form.invoiceStyleId) ?? defaultStyles;
	}

	$: {
		$form.clientId = selectedClient.value;
		$form.client = data.user?.client.find((item) => item.id === $form.clientId) ?? {
			...defaultClient,
			address: defaultAddress
		};
	}

	// payment link
	$: paymentLink = dev
		? `http://localhost:5174/${$form.id}`
		: `https://pay.invoicelink.io/${$form.id}`;
</script>

<PageHeading>
	{#if $form.id}
		<div class="flex w-full items-center justify-start gap-2 py-4 sm:w-auto sm:py-0">
			<Badge status={$form.status} />
			<a
				class="tooltip tooltip-accent"
				data-tip="Preview invoicelink"
				target="_blank"
				href={paymentLink}
			>
				<Icon name="launch" />
			</a>
			<a
				class="tooltip tooltip-accent"
				data-tip="Save a copy"
				target="_blank"
				href="https://api.invoicelink.io/invoice?id={$form.id}&type=invoice&download=true"
			>
				<Icon name="download" />
			</a>
			<CopyToClipboard text={paymentLink} message="Invoicelink copied" />
		</div>
	{/if}
</PageHeading>

<InvoiceAlert />

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
						class="input input-primary max-w-full"
						bind:value={$form.description}
						placeholder="Invoice description"
						disabled={$form.status === 'PAID'}
					/>
				</label>

				<label for="invoiceStyleId" class="form-control">
					<div class="label justify-between">
						<span class="label-text-alt">Style Templates</span>
						<a href="/invoices/template/design" class="label-text-alt hover:underline">Create new</a
						>
					</div>
					<ComboBox
						name="invoiceStyleId"
						placeholder="Select a style template"
						items={templates}
						disabled={$form.status === 'PAID'}
						bind:selected={selectedTemplate}
					/>
				</label>

				<label for="clientId" class="form-control">
					<div class="label justify-between">
						<span class="label-text-alt">Client</span>
						<a href="/clients/manage" class="label-text-alt hover:underline">Create new</a>
					</div>
					<ComboBox
						name="clientId"
						placeholder="Select a client"
						items={clients}
						disabled={$form.status === 'PAID'}
						bind:selected={selectedClient}
					/>
				</label>

				{#if $form.status !== 'PAID'}
					<div class="mt-2 flex w-full flex-col gap-y-2">
						<button
							type="button"
							class="btn join-item btn-sm btn-block text-xs"
							on:click={() => {
								if ($form.lineItems.length > 1) {
									// delete the last item
									$form.lineItems = $form.lineItems.slice(0, -1);
								} else {
									$form.lineItems = [{ ...defaultLineItem }];
								}
							}}
							><Icon name="minus" /> Line item
						</button>
						<button
							type="button"
							class="btn join-item btn-sm btn-block text-xs"
							on:click={() => {
								$form.lineItems = [...$form.lineItems, { ...defaultLineItem }];
							}}
						>
							<Icon name="plus" /> Line item
						</button>
					</div>

					<label class="form-control w-full">
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

					<div class="mt-2 flex w-full flex-col gap-2">
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
