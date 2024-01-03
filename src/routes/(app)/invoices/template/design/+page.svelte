<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Invoice from '$lib/components/Invoice.svelte';
	import ControlPanel from '$lib/components/ControlPanel.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { defaultInvoice } from '$lib/utils/defaults';
	import { superForm } from 'sveltekit-superforms/client';
	import toast from 'svelte-french-toast';

	const { form, message, enhance, submitting } = superForm(data.form, {
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
</script>

<PageHeading heading="Template Design" />
<div class="relative flex h-[70vh] w-full flex-col gap-4 lg:flex-row">
	<div
		class="border-surface-100-800-token hide-scrollbar flex-grow rounded-lg border lg:overflow-y-scroll"
	>
		<Invoice styles={$form} data={defaultInvoice} />
	</div>
	<div class="hide-scrollbar pb-8 lg:overflow-y-scroll lg:pb-0">
		<ControlPanel bind:form={$form} {enhance} submitting={$submitting} />
	</div>
</div>
