<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { SlideToggle, type ModalSettings } from '@skeletonlabs/skeleton';
	import PayfastIntegration from '$lib/components/PayfastIntegration.svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		component: 'ModalDeleteConfirm',
		title: 'Delete Integration',
		body: 'Are you sure you want to delete this integration?',
		response: (r: boolean) => {
			if (r) {
				// submit the form to delete the integration
				const form = document.forms.namedItem('integration-setup');
				if (form) {
					form.action = '?/delete';
					form.submit();
				}
			}
		}
	};

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

<h2 class="text-base font-normal">Payfast Integration</h2>
<p class="text-surface-700-200-token mt-1 text-sm">
	Link your payfast account to accept digital payments
</p>
<form name="integration-setup" method="POST" use:enhance>
	<input name="id" type="hidden" bind:value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label class="label whitespace-nowrap text-xs" for="merchantId">
				Merchant ID
				{#if $errors.merchantId}
					<span class="text-error-400">{$errors.merchantId}</span>
				{/if}
			</label>
			<input
				name="merchantId"
				class="input variant-soft-surface max-w-xl border-none"
				type="text"
				placeholder="Payfast Merchant ID"
				bind:value={$form.merchantId}
				required
			/>
		</li>
		<li>
			<label class="label whitespace-nowrap text-xs" for="merchantKey">
				Merchant Key
				{#if $errors.merchantKey}
					<span class="text-error-400">{$errors.merchantKey}</span>
				{/if}
			</label>
			<input
				name="merchantKey"
				class="input variant-soft-surface max-w-xl border-none"
				type="text"
				placeholder="Payfast Merchant Key"
				bind:value={$form.merchantKey}
				required
			/>
		</li>

		<li>
			<div class="flex w-full items-center justify-between">
				<span class="text-xs">Require security</span>
				<SlideToggle
					size="sm"
					active="bg-primary-500"
					name="slide"
					bind:checked={requireSecurity}
				/>
			</div>
		</li>
		{#if requireSecurity}
			<li>
				<label class="label whitespace-nowrap text-xs" for="passphrase">Security Passphrase</label>
				<input
					name="passphrase"
					class="input variant-soft-surface max-w-xl border-none"
					type="text"
					placeholder="Payfast Passphrase"
					bind:value={$form.passphrase}
				/>
			</li>
		{/if}
	</ul>
	<div class="flex w-full items-center justify-between py-6">
		<PayfastIntegration
			merchantId={$form.merchantId}
			merchantKey={$form.merchantKey}
			passphrase={$form.passphrase}
			amount={10}
			itemName={'Integration setup successful'}
			buttonLabel={'Test integration'}
			buttonClass="btn btn-sm variant-filled"
			{requireSecurity}
		/>
		{#if $form.id}
			<span class="flex items-center justify-center gap-2">
				<button
					type="submit"
					formaction="?/delete"
					class="variant-filled-error btn btn-sm"
					on:click|preventDefault={() => modalStore.trigger(modal)}
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
