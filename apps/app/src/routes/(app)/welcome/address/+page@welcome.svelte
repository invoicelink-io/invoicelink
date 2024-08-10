<script>
	import { goto } from '$app/navigation';
	import Header from '$lib/components/welcome/Header.svelte';
	import { welcome } from '$lib/stores/welcome';
	import toast from 'svelte-french-toast';

	let loading = false;
</script>

<Header
	heading="Billing Address 🏠"
	description="Provide an address to be displayed on your invoices"
/>
<label for="line1" class="label-welcome">
	Address line 1
	<input
		name="line1"
		type="text"
		class="input-welcome"
		placeholder="0A Madiba Cir"
		autocomplete="address-line1"
		bind:value={$welcome.address.line1}
	/>
</label>

<label for="line2" class="label-welcome">
	Address line 2
	<input
		name="line2"
		type="text"
		class="input-welcome"
		placeholder="Rondebosch"
		autocomplete="address-line2"
		bind:value={$welcome.address.line2}
	/>
</label>

<label for="line3" class="label-welcome">
	Address line 3
	<input
		name="line3"
		type="text"
		class="input-welcome"
		placeholder="Cape Town"
		autocomplete="address-line3"
		bind:value={$welcome.address.line3}
	/>
</label>

<label for="postalCode" class="label-welcome">
	Postal Code
	<input
		name="postalCode"
		type="number"
		class="input-welcome"
		required
		placeholder="7700"
		autocomplete="postal-code"
		bind:value={$welcome.address.postalCode}
	/>
</label>

<div class="welcome-actions justify-between">
	<a href="/welcome/currency" class="btn btn-ghost btn-sm text-xs">Back</a>
	<span>
		<a href="/welcome/banking" class="btn btn-sm text-xs">Skip</a>
		<button
			type="button"
			class="btn btn-sm text-xs"
			disabled={loading}
			on:click={async (e) => {
				e.preventDefault();
				loading = true;
				await fetch('/api/welcome/address', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify($welcome)
				})
					.then((res) => {
						if (res.ok) {
							toast.success('Address saved');
							loading = false;
							goto('/welcome/banking');
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
