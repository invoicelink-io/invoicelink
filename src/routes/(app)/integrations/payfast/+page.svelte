<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const payfast = data.integrations?.payfast[0];

	let payfastFormData = {
		merchant_id: payfast?.merchant_id,
		merchant_key: payfast?.merchant_key,
		passphrase: payfast?.passphrase
	};
</script>

<h1 class="h3 my-4 w-full text-center capitalize sm:my-8">Payfast integration settings</h1>

<div class="flex justify-center">
	<form class="form-primary" method="POST">
		<label for="merchant_id">Merchant ID</label>
		<input
			name="merchant_id"
			class="input-primary"
			type="text"
			placeholder="Merchant ID"
			bind:value={payfastFormData.merchant_id}
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
		/>

		<label for="passphrase">Security Passphrase</label>
		<input
			name="passphrase"
			class="input-primary"
			type="text"
			placeholder="Passphrase"
			bind:value={payfastFormData.passphrase}
		/>

		<div class="mt-4 flex w-full justify-end gap-2">
			{#if payfast}
				<button type="submit" class="btn-error" formaction="?/delete&id={payfast.id}">Delete</button
				>
				<button type="submit" class="btn-primary" formaction="?/update&id={payfast.id}"
					>Update</button
				>
			{:else}
				<button type="submit" class="btn-primary" formaction="?/create">Save</button>
			{/if}
		</div>
	</form>
</div>
