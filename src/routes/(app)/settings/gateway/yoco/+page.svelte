<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import YocoIntegration from '$lib/components/integrations/YocoIntegration.svelte';
	import Button from '$lib/components/Button.svelte';
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
		resetForm: false,
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
</script>

<h2 class="text-base font-normal">Yoco Integration</h2>
<p class="text-surface-700-200-token mt-1 text-sm">
	Capture your yoco gateway details below to start accepting payments online
</p>
<form name="integration-setup" method="POST" use:enhance>
	<input name="id" type="hidden" bind:value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label class="label-primary" for="publicKey">
				Live Public Key
				{#if $errors.publicKey}
					<span class="text-error-400">{$errors.publicKey}</span>
				{/if}
			</label>
			<input
				name="publicKey"
				class="input-primary max-w-xl"
				type="text"
				placeholder="Yoco Public Key"
				bind:value={$form.publicKey}
				required
			/>
		</li>
		<li>
			<label class="label-primary" for="secretKey">
				Live Secret Key
				{#if $errors.secretKey}
					<span class="text-error-400">{$errors.secretKey}</span>
				{/if}
			</label>
			<input
				name="secretKey"
				class="input-primary max-w-xl"
				type="text"
				placeholder="Yoco Secret Key"
				bind:value={$form.secretKey}
				required
			/>
		</li>
	</ul>
	<div class="flex w-full items-center justify-between py-6">
		<YocoIntegration
			checkoutId={undefined}
			publicKey={$form.publicKey}
			secretKey={$form.secretKey}
			amount={10}
			itemName={'Integration setup successful'}
			buttonLabel={'Test integration'}
			buttonClass="btn btn-sm variant-filled"
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
				<Button
					formaction="?/update"
					label="Update"
					loadingLabel="Updating"
					loading={$submitting}
					type="submit"
					variant="variant-filled-primary"
				/>
			</span>
		{:else}
			<Button
				formaction="?/create"
				label="Save"
				loadingLabel="Saving"
				loading={$submitting}
				type="submit"
				variant="variant-filled-primary"
			/>
		{/if}
	</div>
</form>
