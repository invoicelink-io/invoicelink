<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import { Button, Divider } from '@invoicelink/ui';

	const { form, enhance, message, submitting } = superForm($page.data.addressForm, {
		resetForm: false,
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});
</script>

<Divider>Address to be displayed on invoices</Divider>

<form method="POST" id="address-settings" action="?/updateAddress" use:enhance>
	<input hidden name="id" value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
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
		</li>
		<li>
			<label for="line2" class="label-primary">Address line 2</label>
			<input
				name="line2"
				type="text"
				class="input-primary"
				placeholder="Rondebosch"
				autocomplete="address-line2"
				bind:value={$form.line2}
			/>
		</li>
		<li>
			<label for="line3" class="label-primary">Address line 3</label>
			<input
				name="line3"
				type="text"
				class="input-primary"
				placeholder="Cape Town"
				autocomplete="address-line3"
				bind:value={$form.line3}
			/>
		</li>
		<li>
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
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<Button
			formaction="?/updateAddress"
			label="Update"
			loadingLabel="Updating"
			loading={$submitting}
			type="submit"
			variant="btn-primary"
		/>
	</div>
</form>
