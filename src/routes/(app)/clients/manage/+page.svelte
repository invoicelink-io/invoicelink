<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Button from '$lib/components/Button.svelte';

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

<PageHeading heading="Client Management" />

<p class="text-surface-700-200-token mt-1 text-sm">Fill out the client details below</p>

<form
	class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
	method="post"
	use:enhance
	action="?/create"
>
	<div class="w-full">
		<div class="mt-4 flex flex-col gap-4">
			<input hidden name="id" value={$form.id} />
			<input hidden name="addressId" value={$form.addressId} />
			<span>
				<label for="name" class="label-primary">Full Name</label>
				<input
					name="name"
					type="text"
					class="input-primary"
					placeholder="John Doe"
					disabled={$form.id !== ''}
					required
					bind:value={$form.name}
				/>
			</span>
			<span>
				<label for="email" class="label-primary">Email</label>
				<input
					name="email"
					type="email"
					required
					class="input-primary"
					placeholder="john@invoicelink.io"
					bind:value={$form.email}
				/>
			</span>
			<span>
				<label for="phone" class="label-primary">Phone</label>
				<input
					name="phone"
					type="tel"
					class="input-primary"
					placeholder="012 345 6789"
					bind:value={$form.phone}
				/>
			</span>
			<span>
				<label for="vatNumber" class="label-primary">VAT Registration Number</label>
				<input
					name="vatNumber"
					type="number"
					class="input-primary"
					placeholder="4123456789"
					bind:value={$form.vatNumber}
				/>
			</span>
		</div>
	</div>
	<div class="w-full">
		<div class="mt-4 flex flex-col gap-4">
			<span>
				<label for="line1" class="label-primary">Address line 1</label>
				<input
					name="line1"
					type="text"
					class="input-primary"
					placeholder="0A Madiba Cir"
					autocomplete="address-line1"
					required
					bind:value={$form.line1}
				/>
			</span>
			<span>
				<label for="line2" class="label-primary">Address line 2</label>
				<input
					name="line2"
					type="text"
					class="input-primary"
					placeholder="Rondebosch"
					autocomplete="address-line2"
					bind:value={$form.line2}
				/>
			</span>
			<span>
				<label for="line3" class="label-primary">Address line 3</label>
				<input
					name="line3"
					type="text"
					class="input-primary"
					placeholder="Cape Town"
					autocomplete="address-line3"
					bind:value={$form.line3}
				/>
			</span>
			<span>
				<label for="postalCode" class="label-primary">Postal Code</label>
				<input
					name="postalCode"
					type="number"
					class="input-primary"
					required
					placeholder="7700"
					autocomplete="postal-code"
					bind:value={$form.postalCode}
				/>
			</span>
			<div class="flex w-full justify-end gap-2">
				{#if $form.id}
					<Button
						formaction="?/delete"
						variant="variant-filled-error"
						loading={submitting === 'delete'}
						label="Delete"
						loadingLabel="Deleting"
					/>
					<Button
						formaction="?/update"
						variant="variant-filled-primary"
						loading={submitting === 'update'}
						label="Update"
						loadingLabel="Updating"
					/>
				{:else}
					<Button
						formaction="?/create"
						variant="variant-filled-primary"
						loading={submitting === 'create'}
						label="Create"
						loadingLabel="Creating"
					/>
				{/if}
			</div>
		</div>
	</div>
</form>
