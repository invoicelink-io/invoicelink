<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';

	const { form, enhance, message, submitting } = superForm($page.data.profileForm, {
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

<h2 class="text-base font-normal">Profile</h2>
<p class="text-surface-700-200-token mt-1 text-sm">Update your profile information</p>

<form method="POST" action="?/updateProfile" use:enhance>
	<ul role="list" class="settings-list">
		<li>
			<label for="name" class="label-primary">Full Name</label>
			<input
				name="name"
				type="text"
				class="input-primary max-w-xl"
				required
				bind:value={$form.name}
			/>
		</li>
		<li>
			<label for="email" class="label-primary">Email</label>
			<input name="email" type="text" class="input-primary max-w-xl" value={$form.email} readonly />
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<Button
			formaction="?/updateProfile"
			label="Update"
			loadingLabel="Updating"
			loading={$submitting}
			type="submit"
			variant="variant-filled-primary"
		/>
	</div>
</form>
