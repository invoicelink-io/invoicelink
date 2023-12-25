<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	export let date: Date = new Date();
	export let align = 'text-right';
</script>

<div class={twMerge('inline', align)}>
	<div class="inline text-gray-500">Issued on</div>
	<div class="inline text-gray-700">
		<time datetime={date.toDateString()}
			>{date.toLocaleDateString('en-ZA', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})}</time
		>
	</div>
</div>
