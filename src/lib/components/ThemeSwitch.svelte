<script lang="ts">
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import type { SubmitFunction } from '../../routes/(app)/$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	const {
		elements: { root, item, hiddenInput },
		helpers: { isChecked }
	} = createRadioGroup({
		defaultValue: $page.data.theme ?? 'light'
	});

	const options = ['light', 'dark'];

	const submitUpdateTheme: SubmitFunction = ({ action, cancel }) => {
		const theme = action.searchParams.get('theme');
		const currentTheme = document.documentElement.getAttribute('data-theme');

		if (theme) {
			if (currentTheme === theme) {
				cancel();
			}
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<form method="POST" use:enhance={submitUpdateTheme}>
	<div
		use:melt={$root}
		class="flex flex-col gap-3 text-sm data-[orientation=horizontal]:flex-row"
		aria-label="View density"
	>
		{#each options as option}
			<div class="flex items-center gap-3">
				<button
					use:melt={$item(option)}
					class="grid h-6 w-6 cursor-default place-items-center rounded-full bg-neutral-50 shadow-sm
      hover:bg-primary-100 dark:bg-neutral-300"
					formaction="/?/setTheme&theme={option}&redirectTo={$page.url.pathname}"
					type="submit"
				>
					{#if $isChecked(option)}
						<div class="h-3 w-3 rounded-full bg-primary-200" />
					{/if}
				</button>
				<label class="font-medium capitalize leading-none" for={option} id="{option}-label">
					{option}
				</label>
			</div>
		{/each}
		<input name="line-height" use:melt={$hiddenInput} />
	</div>
</form>
