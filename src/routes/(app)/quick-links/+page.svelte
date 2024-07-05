<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '$lib/components/Icon.svelte';
	import { formatTimeAgo } from '$lib/utils/time';
	import CopyToClipboard from '$lib/components/CopyToClipboard.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';

	let dialog: HTMLDialogElement;

	const { form, enhance, message, submitting, errors } = superForm(data.form, {
		resetForm: false,
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

	const { message: deleteMessage } = superForm(data.deleteForm, {
		resetForm: false,
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success($deleteMessage);
			} else {
				toast.error($deleteMessage ?? 'Invalid integration');
			}
		},
		onError: () => {
			toast.error($deleteMessage ?? 'Something went wrong');
		}
	});
</script>

<PageHeading />

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-x-8">
	<section>
		<form
			name="create-quick-link"
			class="flex w-full flex-col"
			method="POST"
			use:enhance
			action="?/create"
		>
			<input name="id" type="hidden" bind:value={$form.id} />
			<input name="serial" type="hidden" bind:value={$form.serial} />
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Amount in ZAR</span>
					{#if $errors.amount}
						<span class="label-text-alt text-error">{$errors.amount}</span>
					{/if}
				</div>
				<input
					name="amount"
					class="input input-md input-bordered w-full"
					type="number"
					placeholder="Amount in rands"
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
					formaction="?/create"
					variant="btn-primary"
					loading={$submitting}
					label="Create"
					loadingLabel="Creating"
				/>
			</span>
		</form>
	</section>
	<section class={`min-h-[10rem] p-4`}>
		{#if data.links && data.links.length > 0}
			<h2 class="mb-4 w-full text-center">Previous links</h2>
			<div class="flex flex-col items-center">
				<ul role="list" class="divide-surface-500/10 w-full divide-y">
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
												>{Number(link.total).toLocaleString('en-ZA', {
													style: 'currency',
													currency: 'ZAR'
												})}</span
											>
											{#if link.status !== 'PAID'}
												<Modal
													bind:dialog
													title="Are you sure?"
													body="This action cannot be undone."
												>
													<button
														slot="modal-open-button"
														type="button"
														class="hover:text-error"
														on:click|preventDefault={() => dialog.showModal()}
													>
														<Icon name="trash" />
													</button>
													<button
														slot="modal-confirm-button"
														type="submit"
														class="btn btn-error btn-sm"
														on:click={() => dialog.close()}
														>{$submitting ? `Deleting` : `Delete`}</button
													>
												</Modal>
											{/if}
										</form>
									</h2>
								</div>
								<div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
									<p class="truncate">{link.serial}</p>
									<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none fill-gray-300">
										<circle cx="1" cy="1" r="1" />
									</svg>
									<p class="whitespace-nowrap">
										Created {formatTimeAgo(new Date(link.createdAt))}
									</p>
								</div>
							</div>
							<Badge status={link.status} />
							<a target="_blank" href="/pay?id={link.id}">
								<Icon name="launch" />
							</a>
							<CopyToClipboard text={`${$page.url.origin}/pay?id=${link.id}`} />
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<Empty subtitle="Get started by creating a new quick link" />
		{/if}
	</section>
</div>
