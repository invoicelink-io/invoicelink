<script lang="ts">
	import Header from '$lib/components/welcome/Header.svelte';
	import { welcome } from '$lib/stores/welcome';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import ComboBox from '$lib/components/ui/ComboBox.svelte';
	import { currencies } from '@invoicelink/lib/utils/currency';

	let loading = false;
	let selected = currencies.find((c) => c.value === $welcome.currency) ?? currencies[0];
</script>

<Header heading="What currency do you use? 💸" description="Please select an option below" />
<label data-theme="dark" for="name" class="label-welcome">
	Currency
	<ComboBox
		name="currency"
		bind:selected
		onSelectedChange={(e) => {
			if (e) $welcome.currency = e.value;
		}}
		placeholder="Select currency"
		items={currencies}
	/>
</label>

<div class="welcome-actions justify-between">
	<a href="/welcome/user" class="btn btn-ghost btn-sm text-xs">Back</a>
	<span class="flex items-center gap-2">
		<a href="/welcome/address" class="btn btn-sm text-xs">Skip</a>
		<button
			type="button"
			class="btn btn-sm text-xs"
			disabled={loading}
			on:click={async (e) => {
				e.preventDefault();
				loading = true;
				await fetch('/api/welcome/currency', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify($welcome)
				})
					.then((res) => {
						if (res.ok) {
							toast.success('Currency choice saved');
							loading = false;
							goto('/welcome/address');
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
			Continue
		</button>
	</span>
</div>
