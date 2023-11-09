<script lang="ts">
	export let data: PageData;

	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '$lib/components/Icon.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { formatTimeAgo } from '$lib/utils/time';
	import CopyToClipboard from '$lib/components/ui/modals/CopyToClipboard.svelte';

	const { form, enhance, message, submitting, errors } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($message);
			} else {
				toast.error($message ?? 'Invalid integration');
			}
		},
		onError: () => {
			toast.error($message ?? 'Something went wrong');
		}
	});

	let deleteId = '';

	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		component: 'ModalDeleteConfirm',
		title: 'Delete quick link',
		body: 'Are you sure you want to delete this quick link?',
		response: (r: boolean) => {
			if (r) {
				// submit the form to delete the integration
				const form = document.forms.namedItem(`delete-${deleteId}`);
				console.log(form);
				if (form) {
					form.submit();
					deleteId = '';
				}
			}
		}
	};
</script>

<h1 class="h5 w-full text-center capitalize">Quick links</h1>
<p class="mb-8 text-center">Create instant payment links</p>
<div class="flex flex-col items-center">
	<form
		name="create-quick-link"
		class="flex w-full max-w-xl flex-col"
		method="POST"
		use:enhance
		action="?/create"
	>
		<label class="label mb-1 text-xs" for="amount">
			Amount in ZAR
			{#if $errors.amount}
				<span class="ml-2 text-error-400">{$errors.amount}</span>
			{/if}
		</label>
		<span class="flex w-full flex-row gap-2">
			<input name="id" type="hidden" bind:value={$form.id} />
			<input
				name="amount"
				class="input variant-soft-surface mb-4 border-none text-right"
				type="number"
				placeholder="Amount"
				bind:value={$form.amount}
				min={5}
				required
			/>
			<button type="submit" class="variant-filled-primary btn btn-sm"
				>{$submitting ? `Creating` : `Create`}</button
			>
		</span>
	</form>
	<ul role="list" class="mt-8 w-full max-w-xl divide-y divide-surface-500/10">
		{#if data.links}
			{#each data.links as link}
				<li class="relative flex items-center space-x-4 py-4">
					<div class="min-w-0 flex-auto">
						<div class="flex items-center gap-x-3">
							<h2 class="min-w-0 text-sm font-semibold leading-6">
								<form
									class="flex items-center gap-x-2"
									name="delete-{link.id}"
									method="POST"
									action="?/delete&id={link.id}"
								>
									<span
										>{Number(link.amount).toLocaleString('en-ZA', {
											style: 'currency',
											currency: 'ZAR'
										})}</span
									>
									<CopyToClipboard text={`https://pay.invoicelink.io/${link.id}`} />
									<button
										type="submit"
										on:click|preventDefault={() => {
											deleteId = link.id;
											modalStore.trigger(modal);
										}}
									>
										<Icon name="trash" />
									</button>
								</form>
							</h2>
						</div>
						<div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
							<p class="truncate">Quick Link</p>
							<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300">
								<circle cx="1" cy="1" r="1" />
							</svg>
							<p class="whitespace-nowrap">Created {formatTimeAgo(new Date(link.created_at))}</p>
						</div>
					</div>
					<div
						class="{link.status === 'PAID'
							? `variant-glass-success bg-success-100-800-token text-success-800-100-token`
							: `variant-glass-surface bg-surface-100-800-token text-surface-800-100-token`} badge lowercase"
					>
						{link.status}
					</div>
					<a target="_blank" href="https://pay.invoicelink.io/{link.id}">
						<Icon name="launch" />
					</a>
				</li>
			{/each}
		{:else}
			<span class="bg-red-500">Nothing to see yet. Try creating a quick link.</span>
		{/if}
	</ul>
</div>
