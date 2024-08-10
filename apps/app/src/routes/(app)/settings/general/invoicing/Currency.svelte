<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import Button from '$lib/components/ui/Button.svelte';
	import Divider from '$lib/components/ui/Divider.svelte';
	import ComboBox from '$lib/components/ui/ComboBox.svelte';
	import { currencies } from '$lib/utils/currency';

	const { form, enhance, message, submitting } = superForm($page.data.currencyForm, {
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

	let selected = currencies.find((c) => c.value === $form.currency) ?? currencies[0];
</script>

<Divider>Set your currency</Divider>

<form method="POST" id="currency-settings" action="?/updateCurrency" use:enhance>
	<input hidden name="id" value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label for="line1" class="label-primary">Currency</label>
			<span class="w-full max-w-lg">
				<ComboBox
					name="currency"
					placeholder="Select currency"
					onSelectedChange={(e) => {
						if (e) {
							$form.currency = e.value;
						}
					}}
					bind:selected
					items={currencies}
				/>
			</span>
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<Button
			formaction="?/updateCurrency"
			label="Update"
			loadingLabel="Updating"
			loading={$submitting}
			type="submit"
			variant="btn-primary"
		/>
	</div>
</form>
