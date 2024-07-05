<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import YocoIntegration from '$lib/components/integrations/YocoIntegration.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Divider from '$lib/components/ui/Divider.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';

	let dialog: HTMLDialogElement;

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

<Divider>Accept payments online with Yoco</Divider>
<form name="integration-setup" method="POST" use:enhance>
	<input name="id" type="hidden" bind:value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label class="label-primary" for="publicKey">
				Live Public Key
				{#if $errors.publicKey}
					<span class="text-error">{$errors.publicKey}</span>
				{/if}
			</label>
			<input
				name="publicKey"
				class="input-primary"
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
					<span class="text-error">{$errors.secretKey}</span>
				{/if}
			</label>
			<input
				name="secretKey"
				class="input-primary"
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
		/>
		{#if $form.id}
			<span class="flex items-center justify-center gap-2">
				<Modal bind:dialog>
					<button
						slot="modal-open-button"
						type="button"
						class="btn btn-error btn-sm"
						on:click|preventDefault={() => dialog.showModal()}
						>{$submitting ? `Deleting` : `Delete`}</button
					>
					<button
						slot="modal-confirm-button"
						type="submit"
						formaction="?/delete"
						class="btn btn-error btn-sm"
						on:click={() => dialog.close()}>{$submitting ? `Deleting` : `Delete`}</button
					>
				</Modal>
				<Button
					formaction="?/update"
					label="Update"
					loadingLabel="Updating"
					loading={$submitting}
					type="submit"
					variant="btn-primary"
				/>
			</span>
		{:else}
			<Button
				formaction="?/create"
				label="Save"
				loadingLabel="Saving"
				loading={$submitting}
				type="submit"
				variant="btn-primary"
			/>
		{/if}
	</div>
</form>
