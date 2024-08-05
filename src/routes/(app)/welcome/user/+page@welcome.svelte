<script>
	import Header from '$lib/components/welcome/Header.svelte';
	import { welcome } from '$lib/stores/welcome';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	let loading = false;
</script>

<Header
	heading="Tell us about yourself 🙋‍♂️"
	description="Provide a display name to be shown on invoices"
/>
<label for="name" class="label-welcome">
	Name
	<input
		id="name"
		class="input-welcome"
		placeholder="Your fullname"
		bind:value={$welcome.user.name}
	/>
</label>

<div class="welcome-actions justify-between">
	<a href="/welcome" class="btn btn-ghost btn-sm text-xs">Back</a>
	<span class="flex items-center gap-2">
		<a href="/welcome/address" class="btn btn-sm text-xs">Skip</a>
		<button
			type="button"
			class="btn btn-sm text-xs"
			disabled={loading}
			on:click={async (e) => {
				e.preventDefault();
				loading = true;
				await fetch('/api/welcome/user', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify($welcome)
				})
					.then((res) => {
						if (res.ok) {
							toast.success('User info saved');
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
