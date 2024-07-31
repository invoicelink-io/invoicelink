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
	import Badge from '$lib/components/ui/Badge.svelte';
	import Modal from '$lib/components/ui/Modal.svelte';
	import QuickLinkDrawer from '$lib/components/QuickLinkDrawer.svelte';

	let dialog: HTMLDialogElement;

	const { message: deleteMessage, submitting } = superForm(data.deleteForm, {
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

<PageHeading>
	<QuickLinkDrawer />
</PageHeading>

<div class="grid grid-cols-1 gap-4 xl:gap-x-8">
	<section class={`min-h-[10rem] py-4`}>
		{#if data.links && data.links.length > 0}
			<h2 class="mb-4 w-full text-center">Previous links</h2>
			<div class="flex flex-col items-center">
				<ul role="list" class="divide-surface-500/10 w-full divide-y">
					{#each data.links as link}
						<li class="relative flex items-center space-x-2 py-4">
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
								<div class="mt-3 flex items-center gap-x-2.5 text-xs leading-5">
									<p class="truncate">{link.serial}</p>
									<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 flex-none" fill="currentColor">
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
