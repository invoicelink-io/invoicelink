<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '$lib/components/Icon.svelte';
	import { getModalStore, getDrawerStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { formatTimeAgo } from '$lib/utils/time';
	import CopyToClipboard from '$lib/components/ui/CopyToClipboard.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import Badge from '$lib/components/Badge.svelte';

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

	const { message: deleteMessage } = superForm(data.deleteForm, {
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
				if (form) {
					form.submit();
					deleteId = '';
				}
			}
		}
	};

	// check if tour is present in query params
	const params = $page.url.searchParams;
	const tour = params.get('tour');

	const drawerStore = getDrawerStore();
	if (tour && tour === '4') {
		drawerStore.open({
			id: 'tour-4'
		});
	}
</script>

<PageHeading heading="Quick Links" />

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-x-8">
	<section>
		<h2 class="mb-4 w-full text-center">Create a new link</h2>
		<form
			name="create-quick-link"
			class="flex w-full flex-col"
			method="POST"
			use:enhance
			action="?/create"
		>
			<label class="label-primary" for="amount">
				Amount in ZAR
				{#if $errors.amount}
					<span class="ml-2 text-error-400">{$errors.amount}</span>
				{/if}
			</label>
			<input name="id" type="hidden" bind:value={$form.id} />
			<input name="serial" type="hidden" bind:value={$form.serial} />
			<input
				name="amount"
				class="input-primary"
				type="number"
				placeholder="Amount in rands"
				bind:value={$form.amount}
				min={5}
				required
			/>
			<label class="label mb-1 mt-4 text-xs" for="amount">
				Description
				{#if $errors.description}
					<span class="ml-2 text-error-400">{$errors.description}</span>
				{/if}
			</label>
			<input
				name="description"
				class="input-primary"
				type="text"
				placeholder="Services rendered"
				bind:value={$form.description}
				required
			/>
			<button type="submit" class="variant-filled-primary btn btn-sm mt-4 w-max self-end"
				>{$submitting ? `Busy` : `Create`}</button
			>
		</form>
	</section>
	<section
		class={`border-surface-100-800-token min-h-[10rem] rounded-lg border bg-transparent p-4 ${
			data.links.length > 0 ? '' : 'border-surface-200-700-token border-dashed'
		}`}
	>
		{#if data.links && data.links.length > 0}
			<h2 class="mb-4 w-full text-center">Previous links</h2>
			<div class="flex flex-col items-center">
				<ul role="list" class="w-full divide-y divide-surface-500/10">
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
												<button
													type="submit"
													on:click|preventDefault={() => {
														deleteId = link.id;
														modalStore.trigger(modal);
													}}
												>
													<Icon name="trash" />
												</button>
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
			<Empty hideBorder subtitle="Get started by creating a new quick link" />
		{/if}
	</section>
</div>
