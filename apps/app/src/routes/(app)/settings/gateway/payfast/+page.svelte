<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Payfast as PayfastIntegration } from '@invoicelink/ui/payments';
	import { Button, Divider, Modal } from '@invoicelink/ui';
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

	let requireSecurity = $form.passphrase ? true : false;

	$: {
		if (!requireSecurity) {
			form.set({ ...$form, passphrase: '' });
		}
	}
</script>

<Divider>Accept payments online with Payfast</Divider>
<form name="integration-setup" method="POST" use:enhance>
	<input name="id" type="hidden" bind:value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label class="label-primary" for="merchantId">
				Merchant ID
				{#if $errors.merchantId}
					<span class="text-error">{$errors.merchantId}</span>
				{/if}
			</label>
			<input
				name="merchantId"
				class="input-primary"
				type="text"
				placeholder="Payfast Merchant ID"
				bind:value={$form.merchantId}
				required
			/>
		</li>
		<li>
			<label class="label-primary" for="merchantKey">
				Merchant Key
				{#if $errors.merchantKey}
					<span class="text-error">{$errors.merchantKey}</span>
				{/if}
			</label>
			<input
				name="merchantKey"
				class="input-primary"
				type="text"
				placeholder="Payfast Merchant Key"
				bind:value={$form.merchantKey}
				required
			/>
		</li>

		<li>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text mr-2">Require Signature</span>
					<input type="checkbox" class="toggle toggle-accent" bind:checked={requireSecurity} />
				</label>
			</div>
		</li>
		{#if requireSecurity}
			<li>
				<label class="label-primary" for="passphrase">Security Passphrase</label>
				<input
					name="passphrase"
					class="input-primary"
					type="text"
					placeholder="Payfast Passphrase"
					bind:value={$form.passphrase}
				/>
			</li>
		{/if}
	</ul>
	<div class="flex w-full items-center justify-between py-6">
		<PayfastIntegration
			userId={data.user?.id ?? ''}
			merchantId={$form.merchantId}
			merchantKey={$form.merchantKey}
			passphrase={$form.passphrase}
			amount={10}
			itemName={'Integration setup successful'}
			buttonLabel={'Test integration'}
			{requireSecurity}
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
