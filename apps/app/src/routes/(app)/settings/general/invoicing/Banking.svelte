<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import { Button, Divider } from '@invoicelink/ui';

	const { form, enhance, message, submitting } = superForm($page.data.bankingForm, {
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
</script>

<Divider>Banking details to be displayed on invoices</Divider>

<form id="banking-settings" method="POST" action="?/updateBank" use:enhance>
	<input hidden name="id" value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label for="accountHolder" class="label-primary">Account Holder</label>
			<input
				name="accountHolder"
				type="text"
				class="input-primary"
				placeholder="Account holder"
				required
				bind:value={$form.accountHolder}
			/>
		</li>
		<li>
			<label for="accountNo" class="label-primary">Account Number</label>
			<input
				name="accountNo"
				type="text"
				class="input-primary"
				placeholder="1234567890"
				required
				bind:value={$form.accountNo}
			/>
		</li>
		<li>
			<label for="accountType" class="label-primary">Account Type</label>
			<input
				name="accountType"
				type="text"
				class="input-primary"
				placeholder="Current Account"
				required
				bind:value={$form.accountType}
			/>
		</li>
		<li>
			<label for="bankName" class="label-primary">Bank Name</label>
			<input
				name="bankName"
				type="text"
				class="input-primary"
				placeholder="Nedbank"
				required
				bind:value={$form.bankName}
			/>
		</li>
		<li>
			<label for="branchCode" class="label-primary">Branch Code</label>
			<input
				name="branchCode"
				type="text"
				class="input-primary"
				placeholder="198765"
				required
				bind:value={$form.branchCode}
			/>
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<Button
			formaction="?/updateBank"
			label="Update"
			loadingLabel="Updating"
			loading={$submitting}
			type="submit"
			variant="btn-primary"
		/>
	</div>
</form>
