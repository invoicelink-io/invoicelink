<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let editable: boolean = false;
	export let date = new Date().toLocaleDateString('en-ZA').replaceAll('/', '-');
	export let align = 'text-right';
</script>

<div
	class={twMerge(
		'group flex items-center gap-2',
		align === `text-right` ? `justify-end` : `justify-start`
	)}
>
	<span class="py-2 opacity-50">Issued on</span>
	<div class="hidden w-max group-focus-within:flex group-hover:flex">
		<input
			class={'input-invoice'}
			disabled={!editable}
			type="date"
			pattern="\d{4}-\d{2}-\d{2}"
			bind:value={date}
		/>
	</div>
	<span class="group-focus-within:hidden group-hover:hidden"
		>{new Date(date).toLocaleDateString('en-ZA', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		})}
	</span>
</div>
