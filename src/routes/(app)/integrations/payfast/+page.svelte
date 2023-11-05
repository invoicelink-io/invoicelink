<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import TestIntegration from './Integration.svelte';

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

	$: {
		if (!requireSecurity) {
			form.set({ ...$form, passphrase: '' });
		}
	}
</script>

<h1 class="h3 my-4 w-full text-center capitalize sm:my-8">Payfast integration settings</h1>
<div class="flex justify-center">
	<form class="flex w-full max-w-xl flex-col" method="POST" use:enhance>
		<input name="id" type="hidden" bind:value={$form.id} />
		<label class="label mb-1 text-xs" for="merchant_id">
			Merchant ID
			{#if $errors.merchant_id}
				<span class="text-error-400">{$errors.merchant_id}</span>
			{/if}
		</label>
		<input
			name="merchant_id"
			class="input variant-soft-surface mb-4 border-none"
			type="text"
			placeholder="Payfast Merchant ID"
			bind:value={$form.merchant_id}
			required
		/>

		<label class="label mb-1 text-xs" for="merchant_key">
			Merchant Key
			{#if $errors.merchant_key}
				<span class="text-error-400">{$errors.merchant_key}</span>
			{/if}
		</label>
		<input
			name="merchant_key"
			class="input variant-soft-surface mb-4 border-none"
			type="text"
			placeholder="Payfast Merchant Key"
			bind:value={$form.merchant_key}
			required
		/>
		<div class="mb-4 flex w-full items-center justify-end gap-2">
			<span class="text-xs">Require security</span>
			<SlideToggle size="sm" active="bg-primary-500" name="slide" bind:checked={requireSecurity} />
		</div>
		{#if requireSecurity}
			<label class="label mb-1 text-xs" for="passphrase">Security Passphrase</label>
			<input
				name="passphrase"
				class="input variant-soft-surface mb-4 border-none"
				type="text"
				placeholder="Payfast Passphrase"
				bind:value={$form.passphrase}
			/>
		{/if}

		<div class="mt-4 flex w-full justify-between gap-2">
			<TestIntegration {form} {requireSecurity} />
			{#if $form.id}
				<span class="flex items-center justify-center gap-2">
					<button type="submit" class="variant-filled-error btn btn-sm" formaction="?/delete"
						>{$submitting ? `Deleting` : `Delete`}</button
					>
					<button type="submit" class="variant-filled-primary btn btn-sm" formaction="?/update"
						>{$submitting ? `Updating` : `Update`}</button
					>
				</span>
			{:else}
				<button type="submit" class="variant-filled-primary btn btn-sm" formaction="?/create"
					>{$submitting ? `Saving` : `Save`}</button
				>
			{/if}
		</div>
	</form>
</div>
