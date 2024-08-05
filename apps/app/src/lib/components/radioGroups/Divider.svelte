<script lang="ts">
	export let divider = 'solid';
	const options = [
		{ value: 'hidden', label: 'hidden' },
		{ value: 'solid', label: 'solid' },
		{ value: 'dashed', label: 'dashed' },
		{ value: 'dotted', label: 'dotted' }
	];
	import Radio from './Radio.svelte';
</script>

<Radio bind:selected={divider} {options} />
