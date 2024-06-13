<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/settings/Divider.svelte';

	let submitting: 'create' | 'update' | 'delete' | null = null;

	const { form, enhance, message } = superForm(data.form, {
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
				toast.error($message ?? 'Invalid');
			}
			submitting = null;
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
			submitting = null;
		}
	});
</script>

<PageHeading />
<Divider>Capture your clients details</Divider>
<form
	class="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-4"
	method="post"
	use:enhance
	action="?/create"
>
	<div class="w-full">
		<div class="mt-4 flex flex-col gap-2">
			<input hidden name="id" value={$form.id} />
			<input hidden name="addressId" value={$form.addressId} />

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Client Name</span>
				</div>
				<input
					name="name"
					type="text"
					class={`input-primary max-w-full ${$form.id !== '' ? '!input-disabled' : ''}`}
					placeholder="John Doe"
					readonly={$form.id !== ''}
					required
					bind:value={$form.name}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Email</span>
				</div>
				<input
					name="email"
					type="email"
					required
					class="input-primary max-w-full"
					placeholder="john@invoicelink.io"
					bind:value={$form.email}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Phone Number</span>
				</div>
				<input
					name="phone"
					type="tel"
					class="input-primary max-w-full"
					placeholder="012 345 6789"
					bind:value={$form.phone}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">VAT Number</span>
				</div>
				<input
					name="vatNumber"
					type="number"
					class="input-primary max-w-full"
					placeholder="4123456789"
					bind:value={$form.vatNumber}
				/>
			</label>
		</div>
	</div>
	<div class="w-full">
		<div class="mt-4 flex flex-col gap-2">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Address line 1</span>
				</div>
				<input
					name="line1"
					type="text"
					class="input-primary max-w-full"
					placeholder="0A Madiba Cir"
					autocomplete="address-line1"
					required
					bind:value={$form.line1}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Address line 2</span>
				</div>
				<input
					name="line2"
					type="text"
					class="input-primary max-w-full"
					placeholder="Rondebosch"
					autocomplete="address-line2"
					bind:value={$form.line2}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Address line 3</span>
				</div>
				<input
					name="line3"
					type="text"
					class="input-primary max-w-full"
					placeholder="Cape Town"
					autocomplete="address-line3"
					bind:value={$form.line3}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text text-xs">Postal Code</span>
				</div>
				<input
					name="postalCode"
					type="number"
					class="input-primary max-w-full"
					required
					placeholder="7700"
					autocomplete="postal-code"
					bind:value={$form.postalCode}
				/>
			</label>

			<div class="mt-2 flex w-full justify-end gap-2">
				{#if $form.id}
					<Button
						formaction="?/delete"
						variant="btn-error"
						loading={submitting === 'delete'}
						label="Delete"
						loadingLabel="Deleting"
					/>
					<Button
						formaction="?/update"
						variant="btn-primary"
						loading={submitting === 'update'}
						label="Update"
						loadingLabel="Updating"
					/>
				{:else}
					<Button
						formaction="?/create"
						variant="btn-primary"
						loading={submitting === 'create'}
						label="Create"
						loadingLabel="Creating"
					/>
				{/if}
			</div>
		</div>
	</div>
</form>
