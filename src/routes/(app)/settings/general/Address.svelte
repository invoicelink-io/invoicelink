<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	const { form, enhance, message, submitting } = superForm($page.data.addressForm, {
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

<h2 class="text-base font-normal">Address</h2>
<p class="text-surface-700-200-token mt-1 text-sm">
	Update your address to be displayed on invoices.
</p>

<form method="POST" action="?/updateAddress" use:enhance>
	<input hidden name="id" value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label for="line1" class="whitespace-nowrap capitalize">Address line 1</label>
			<input
				name="line1"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="0A Madiba Cir"
				autocomplete="address-line1"
				required
				bind:value={$form.line1}
			/>
		</li>
		<li>
			<label for="line2" class="whitespace-nowrap capitalize">Address line 2</label>
			<input
				name="line2"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="Rondebosch"
				autocomplete="address-line2"
				bind:value={$form.line2}
			/>
		</li>
		<li>
			<label for="line3" class="whitespace-nowrap capitalize">Address line 3</label>
			<input
				name="line3"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="Cape Town"
				autocomplete="address-line3"
				bind:value={$form.line3}
			/>
		</li>
		<li>
			<label for="postalCode" class="whitespace-nowrap capitalize">Postal Code</label>
			<input
				name="postalCode"
				type="number"
				class="input variant-soft-surface max-w-xl border-none"
				required
				placeholder="7700"
				autocomplete="postal-code"
				bind:value={$form.postalCode}
			/>
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<button disabled={$submitting} type="submit" class="variant-filled-primary btn btn-sm"
			>{$submitting ? `Updating` : `Update`}</button
		>
	</div>
</form>
