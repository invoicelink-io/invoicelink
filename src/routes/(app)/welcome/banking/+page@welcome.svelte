<script lang="ts">
	import Header from '$lib/components/welcome/Header.svelte';
	import { welcome } from '$lib/stores/welcome';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	let loading = false;
</script>

<Header
	heading="Banking Details 💳"
	description="Provide your banking details to be displayed on your invoices"
/>

<label for="accountHolder" class="label-welcome">
	Account Holder
	<input
		name="accountHolder"
		type="text"
		class="input-welcome"
		placeholder="Account holder"
		bind:value={$welcome.bankDetails.accountHolder}
	/>
</label>

<label for="accountNo" class="label-welcome">
	Account Number
	<input
		name="accountNo"
		type="text"
		class="input-welcome"
		placeholder="1234567890"
		bind:value={$welcome.bankDetails.accountNo}
	/>
</label>

<label for="accountType" class="label-welcome">
	Account Type
	<input
		name="accountType"
		type="text"
		class="input-welcome"
		placeholder="Current Account"
		bind:value={$welcome.bankDetails.accountType}
	/>
</label>

<label for="bankName" class="label-welcome">
	Bank Name
	<input
		name="bankName"
		type="text"
		class="input-welcome"
		placeholder="Nedbank"
		bind:value={$welcome.bankDetails.bankName}
	/>
</label>

<label for="branchCode" class="label-welcome">
	Branch Code
	<input
		name="branchCode"
		type="text"
		class="input-welcome"
		placeholder="198765"
		bind:value={$welcome.bankDetails.branchCode}
	/>
</label>

<div class="welcome-actions">
	<a href="/welcome/address" class="btn btn-sm text-xs">Back</a>
	<button
		type="button"
		class="btn btn-sm text-xs"
		disabled={loading}
		on:click={async (e) => {
			e.preventDefault();
			loading = true;
			await fetch('/api/welcome/banking', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify($welcome)
			})
				.then((res) => {
					if (res.ok) {
						toast.success('Bank details saved');
						loading = false;
						goto('/');
					}
				})
				.catch((err) => {
					loading = false;
					if (err instanceof Error) {
						toast.error(err.message);
					}
				});
		}}
	>
		{#if loading}
			<span class="loading loading-spinner loading-xs"></span>
		{/if}
		Finish
	</button>
</div>
