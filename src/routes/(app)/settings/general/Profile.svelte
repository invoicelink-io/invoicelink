<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	const { form, enhance, message, submitting } = superForm($page.data.profileForm, {
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

<h2 class="text-base font-normal">Profile</h2>
<p class="text-surface-700-200-token mt-1 text-sm">Update your profile information</p>

<form method="POST" action="?/updateProfile" use:enhance>
	<ul role="list" class="settings-list">
		<li>
			<label for="name" class="whitespace-nowrap capitalize">Full Name</label>
			<input
				name="name"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				required
				bind:value={$form.name}
			/>
		</li>
		<li>
			<label for="email" class="whitespace-nowrap capitalize">Email</label>
			<input
				name="email"
				type="text"
				class="input variant-soft-surface max-w-xl border-none"
				value={$form.email}
				readonly
			/>
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<button disabled={$submitting} type="submit" class="variant-filled-primary btn btn-sm"
			>{$submitting ? `Updating` : `Update`}</button
		>
	</div>
</form>
