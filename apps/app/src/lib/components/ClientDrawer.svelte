<script lang="ts">
	export let unstyledButton = false;
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { Drawer, Button, Alert } from '@invoicelink/ui';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';

	let open = false;

	const { form, enhance, message, submitting } = superForm($page.data.clientForm, {
		resetForm: true,
		onUpdated: async ({ form }) => {
			if (form.valid) {
				open = false;
				// reload the page
				toast.success($message);
				await invalidateAll();
			} else {
				toast.error($message ?? 'Invalid integration');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});
</script>

<Drawer id="create-quick-link" label="New Client" unstyled={unstyledButton} bind:open>
	<Alert class="alert text-center">Fill out the form below to create a new client.</Alert>
	<form name="create-quick-link" class="flex w-full flex-col" method="POST" use:enhance>
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
		<span class="flex w-full justify-end pt-4">
			<Button
				formaction="/clientss?/createClient"
				variant="btn-accent"
				loading={$submitting}
				label="Create"
				loadingLabel="Creating"
			/>
		</span>
	</form>
</Drawer>
