<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import { isAppleMobile } from '$lib/utils/platform';
	import { browser } from '$app/environment';
	import Switch from '$lib/components/ui/Switch.svelte';

	let testInCurrentWindow = false;
	if (browser) {
		testInCurrentWindow = isAppleMobile(navigator.userAgent);
	}

	const { form, enhance, message, submitting, errors } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid integration');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});

	let requireSecurity = $form.passphrase ? true : false;
</script>

<h1 class="h3 my-4 w-full text-center capitalize sm:my-8">Payfast integration settings</h1>
<div class="flex justify-center">
	<form class="form-primary" method="POST" use:enhance>
		<input name="id" type="hidden" bind:value={$form.id} />
		<label for="merchant_id">
			Merchant ID
			{#if $errors.merchant_id}
				<span class="text-error-100">{$errors.merchant_id}</span>
			{/if}
		</label>
		<input
			name="merchant_id"
			class="input-primary"
			type="text"
			placeholder="Merchant ID"
			bind:value={$form.merchant_id}
			required
		/>

		<label for="merchant_key">
			Merchant Key
			{#if $errors.merchant_key}
				<span class="text-error-100">{$errors.merchant_key}</span>
			{/if}
		</label>
		<input
			name="merchant_key"
			class="input-primary"
			type="text"
			placeholder="Merchant Key"
			bind:value={$form.merchant_key}
			required
		/>
		<div class="flex w-full justify-end">
			<Switch name="Require security" bind:isChecked={requireSecurity} />
		</div>
		{#if requireSecurity}
			<label for="passphrase">Security Passphrase</label>
			<input
				name="passphrase"
				class="input-primary"
				type="text"
				placeholder="Passphrase"
				bind:value={$form.passphrase}
			/>
		{/if}

		<div class="mt-4 flex w-full justify-between gap-2">
			<button
				type="button"
				class="btn-secondary"
				on:click|preventDefault={() => {
					const payfastTestForm = document.forms.namedItem('payfast_test');
					if (payfastTestForm) {
						const signatureInputs = payfastTestForm.querySelectorAll('input[name="signature"]');
						if (signatureInputs) {
							for (const signatureInput of signatureInputs) {
								payfastTestForm.removeChild(signatureInput);
							}
						}
						if ($form.passphrase) {
							fetch('/api/payfast/generate_signature', {
								method: 'POST',
								body: JSON.stringify({
									data: Object.fromEntries(new FormData(payfastTestForm)),
									passphrase: $form.passphrase
								})
							})
								.then((res) => {
									return res.json();
								})
								.then((signature) => {
									// add signature to form
									payfastTestForm.appendChild(
										Object.assign(document.createElement('input'), {
											type: 'hidden',
											name: 'signature',
											value: signature
										})
									);
									payfastTestForm.submit();
								});
						} else {
							payfastTestForm.submit();
						}
					}
				}}>Test integration</button
			>
			{#if $form.id}
				<span class="flex items-center justify-center gap-2">
					<button type="submit" class="btn-error" formaction="?/delete"
						>{$submitting ? `Deleting` : `Delete`}</button
					>
					<button type="submit" class="btn-primary" formaction="?/update"
						>{$submitting ? `Updating` : `Update`}</button
					>
				</span>
			{:else}
				<button type="submit" class="btn-primary" formaction="?/create"
					>{$submitting ? `Saving` : `Save`}</button
				>
			{/if}
		</div>
	</form>
</div>

<form
	target={testInCurrentWindow ? `_self` : `_blank`}
	name="payfast_test"
	action="https://www.payfast.co.za/eng/process"
	method="POST"
>
	<input type="hidden" name="merchant_id" value={$form.merchant_id} />
	<input type="hidden" name="merchant_key" value={$form.merchant_key} />
	<input type="hidden" name="return_url" value={$page.url.href} />
	<input type="hidden" name="cancel_url" value={$page.url.href} />
	<input type="hidden" name="amount" value="10.00" />
	<input type="hidden" name="item_name" value="Invoicelink integration successful" />
</form>
