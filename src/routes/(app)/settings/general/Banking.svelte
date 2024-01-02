<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	const { form, enhance, message, submitting } = superForm($page.data.bankingForm, {
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

<h2 class="text-base font-normal">Banking details</h2>
<p class="text-surface-700-200-token mt-1 text-sm">
	Update your banking details to be displayed on invoices.
</p>

<form method="POST" action="?/updateBank" use:enhance>
	<input hidden name="id" value={$form.id} />
	<ul role="list" class="settings-list">
		<li>
			<label for="accountHolder" class="whitespace-nowrap capitalize">Account Holder</label>
			<input
				name="accountHolder"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="Account holder"
				required
				bind:value={$form.accountHolder}
			/>
		</li>
		<li>
			<label for="accountNo" class="whitespace-nowrap capitalize">Account Number</label>
			<input
				name="accountNo"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="1234567890"
				required
				bind:value={$form.accountNo}
			/>
		</li>
		<li>
			<label for="accountType" class="whitespace-nowrap capitalize">Account Type</label>
			<input
				name="accountType"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="Current Account"
				required
				bind:value={$form.accountType}
			/>
		</li>
		<li>
			<label for="bankName" class="whitespace-nowrap capitalize">Bank Name</label>
			<input
				name="bankName"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="Nedbank"
				required
				bind:value={$form.bankName}
			/>
		</li>
		<li>
			<label for="branchCode" class="whitespace-nowrap capitalize">Branch Code</label>
			<input
				name="branchCode"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				placeholder="198765"
				required
				bind:value={$form.branchCode}
			/>
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<button disabled={$submitting} type="submit" class="variant-filled-primary btn btn-sm"
			>{$submitting ? `Updating` : `Update`}</button
		>
	</div>
</form>
