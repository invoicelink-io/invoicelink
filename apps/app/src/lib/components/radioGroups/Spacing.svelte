<script lang="ts">
	export let spacing = 'text-base';
	const options = [
		{ value: 'py-2', label: 'space 2' },
		{ value: 'py-4', label: 'space 4' },
		{ value: 'py-8', label: 'space 8' }
	];
	import Radio from './Radio.svelte';
</script>

<Radio bind:selected={spacing} {options} />
