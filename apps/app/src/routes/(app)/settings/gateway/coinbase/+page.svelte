<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	import { Button, Divider, Modal } from '@invoicelink/ui';
	import { Coinbase as CoinbaseIntegration } from '@invoicelink/ui/payments';

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

<Divider>Accept crypto online with Coinbase Commerce</Divider>
<form name="integration-setup" method="POST" use:enhance>
	<input name="id" type="hidden" bind:value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label class="label-primary" for="secretKey">
				API Key
				{#if $errors.secretKey}
					<span class="text-error">{$errors.secretKey}</span>
				{/if}
			</label>
			<input
				name="secretKey"
				class="input-primary"
				type="text"
				placeholder="Coinbase Commerce API Key"
				bind:value={$form.secretKey}
				required
			/>
		</li>
	</ul>
	<div class="flex w-full items-center justify-between py-6">
		<CoinbaseIntegration
			id={'test'}
			secretKey={$form.secretKey}
			amount={10}
			itemName={'Integration setup successful'}
			buttonLabel={'Test integration'}
			openInNewTab={false}
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
