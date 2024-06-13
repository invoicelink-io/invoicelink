<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/settings/Divider.svelte';

	const { form, enhance, message, submitting } = superForm(data.profileForm, {
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

<Divider>Update your profile information</Divider>

<form id="profile-settings" method="POST" action="?/updateProfile" use:enhance>
	<ul role="list" class="settings-list">
		<li>
			<label for="name" class="label-primary">Name</label>
			<input name="name" type="text" class="input-primary" required bind:value={$form.name} />
		</li>
		<li>
			<label for="email" class="label-primary">Email</label>
			<input
				name="email"
				type="text"
				class="input input-md input-bordered input-disabled w-full max-w-lg"
				bind:value={$form.email}
				readonly
			/>
		</li>
	</ul>
	<div class="flex justify-end py-4">
		<Button
			formaction="?/updateProfile"
			label="Update"
			loadingLabel="Updating"
			loading={$submitting}
			type="submit"
			variant="btn-primary"
		/>
	</div>
</form>
