<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Invoice from '$lib/components/Invoice.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';

	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { defaultInvoice, defaultLineItem, defaultStyles } from '$lib/utils/defaults';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import type { InvoiceStyles, LineItem } from '@prisma/client';
	import Alert from '$lib/components/invoice/Alert.svelte';

	const templates = data.user?.invoiceStyles.map((item) => {
		return { value: item.id, label: item.name };
	}) ?? [{ value: defaultStyles.id, label: defaultStyles.name }];

	let styles: InvoiceStyles = defaultStyles;

	let lineItems = [{ ...defaultLineItem }] satisfies LineItem[];

	const { form, enhance, message, submitting, errors } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid invoice');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});

	let tax = 15;

	$: {
		styles =
			data.user?.invoiceStyles.find((item) => item.id === $form.invoiceStyleId) ?? defaultStyles;
	}
</script>

<PageHeading heading="New Invoice" />

<Alert />

{#if data.user}
	<div class="relative flex h-[70vh] w-full flex-col gap-4 lg:flex-row">
		<div
			class="border-surface-100-800-token hide-scrollbar flex-grow rounded-lg border lg:overflow-y-scroll"
		>
			<Invoice
				{styles}
				{tax}
				data={{
					...$form,
					user: data.user,
					lineItems,
					sendersAddress: data.user.address[0],
					sendersAddressId: data.user.address[0]?.id,
					client: {
						id: '1',
						email: '',
						name: '',
						createdAt: new Date(),
						updatedAt: new Date(),
						phone: '',
						userId: '123',
						vatNumber: '12345',
						addressId: '123',
						address: {
							id: '123',
							line1: '',
							line2: '',
							line3: '',
							postalCode: '',
							userId: '123'
						}
					}
				}}
				editable
			/>
		</div>
		<div class="hide-scrollbar min-w-[25%] pb-8 lg:overflow-y-scroll lg:pb-0">
			<form method="post" class="relative flex flex-col gap-y-4" action="?/create">
				<input name="id" type="hidden" value={defaultInvoice.id} />
				<span>
					<label class="label mb-1 text-xs" for="description">Description</label>
					<input
						name="description"
						type="text"
						class="input-primary"
						placeholder="Invoice description"
					/>
				</span>

				<span>
					<label class="label mb-1 text-xs" for="templates">Invoice template</label>
					<Dropdown
						options={templates}
						placeholder={'Select a template'}
						bind:selected={$form.invoiceStyleId}
					/>
				</span>

				<span>
					<label class="label mb-1 text-xs" for="clients">Client</label>
					<Dropdown placeholder={'Select a client'} bind:selected={$form.clientId} />
				</span>

				<RangeSlider name="range-slider" bind:value={tax} max={100} step={1}>
					<div class="flex items-center justify-between">
						<div class="label text-xs">Tax</div>
						<div class="text-xs">{tax}%</div>
					</div>
				</RangeSlider>
				<div class="flex w-full gap-2">
					<button
						type="button"
						class="variant-soft-surface btn btn-sm w-full"
						on:click={() => {
							if (lineItems.length > 0) {
								// delete the last item
								lineItems = lineItems.slice(0, -1);
							} else {
								lineItems = [{ ...defaultLineItem }];
							}
						}}>Remove line item</button
					>
					<button
						type="button"
						on:click={() => {
							lineItems = [...lineItems, { ...defaultLineItem }];
						}}
						class="variant-soft-surface btn btn-sm w-full">Add line item</button
					>
				</div>
				<button type="button" class="variant-filled-primary btn btn-sm w-full">Create</button>
			</form>
		</div>
	</div>
{/if}
