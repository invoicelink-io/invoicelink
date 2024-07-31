<script lang="ts">
	import { page } from '$app/stores';
	import Drawer from './ui/Drawer.svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import Button from '$lib/components/ui/Button.svelte';
	import Alert from './ui/Alert.svelte';

	console.log($page);

	let open = false;

	const { form, enhance, message, submitting, errors } = superForm($page.data.quickLinkForm, {
		resetForm: true,
		onUpdated: ({ form }) => {
			if (form.valid) {
				open = false;
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid integration');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});
</script>

<Drawer id="create-quick-link" label="New Link" bind:open>
	<Alert class="alert text-center">Fill out the form below to create a quick payment link.</Alert>
	<form name="create-quick-link" class="flex w-full flex-col" method="POST" use:enhance>
		<input name="id" type="hidden" bind:value={$form.id} />
		<input name="serial" type="hidden" bind:value={$form.serial} />
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Amount</span>
				{#if $errors.amount}
					<span class="label-text-alt text-error">{$errors.amount}</span>
				{/if}
			</div>
			<input
				name="amount"
				class="input input-md input-bordered w-full"
				type="number"
				placeholder="Amount to charge"
				bind:value={$form.amount}
				min={5}
				required
			/>
		</label>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Description</span>
				{#if $errors.description}
					<span class="label-text-alt text-error">{$errors.description}</span>
				{/if}
			</div>
			<input
				name="description"
				class="input input-md input-bordered w-full"
				type="text"
				placeholder="Services rendered"
				bind:value={$form.description}
				required
			/>
		</label>
		<span class="flex w-full justify-end pt-4">
			<Button
				formaction="/quick-links?/create"
				variant="btn-accent"
				loading={$submitting}
				label="Create"
				loadingLabel="Creating"
			/>
		</span>
	</form>
</Drawer>
