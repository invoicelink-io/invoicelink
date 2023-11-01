<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { PageData, SubmitFunction } from './$types';
	export let data: PageData;
	let loading = false;

	$: payfast = data.integrations?.payfast[0];
	let payfastFormData = {
		merchant_id: payfast?.merchant_id ?? '',
		merchant_key: payfast?.merchant_key ?? '',
		passphrase: payfast?.passphrase ?? ''
	};

	const handleSubmit: SubmitFunction = ({ cancel, action }) => {
		let actionType = 'create';
		let reset = false;
		if (action.search.includes('update')) {
			actionType = 'update';
		} else if (action.search.includes('delete')) {
			actionType = 'delete';
		}

		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success(`Payfast integration ${actionType}d!`);
					if (actionType === 'delete') {
						reset = true;
					}
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					break;
			}
			await update({
				reset
			});
			loading = false;
		};
	};
</script>

<h1 class="h3 my-4 w-full text-center capitalize sm:my-8">Payfast integration settings</h1>
<div class="flex justify-center">
	<form class="form-primary" method="POST" use:enhance={handleSubmit}>
		<label for="merchant_id">Merchant ID</label>
		<input
			name="merchant_id"
			class="input-primary"
			type="text"
			placeholder="Merchant ID"
			bind:value={payfastFormData.merchant_id}
			disabled={loading}
			required
		/>

		<label for="merchant_key">Merchant Key</label>
		<input
			name="merchant_key"
			class="input-primary"
			type="text"
			placeholder="Merchant Key"
			bind:value={payfastFormData.merchant_key}
			required
			disabled={loading}
		/>

		<label for="passphrase">Security Passphrase</label>
		<input
			name="passphrase"
			class="input-primary"
			type="text"
			placeholder="Passphrase"
			disabled={loading}
			bind:value={payfastFormData.passphrase}
		/>

		<div class="mt-4 flex w-full justify-end gap-2">
			{#if payfast?.id}
				<button type="submit" class="btn-error" formaction="?/delete&id={payfast.id}">Delete</button
				>
				<button type="submit" class="btn-primary" formaction="?/update&id={payfast.id}"
					>Update</button
				>
			{:else}
				<button type="submit" class="btn-primary" formaction="?/create" disabled={loading}
					>Save</button
				>
			{/if}
		</div>
	</form>
</div>
