<script lang="ts">
	export let size = 'text-base';
	const options = [
		{ value: 'text-xs', label: 'xs' },
		{ value: 'text-sm', label: 'sm' },
		{ value: 'text-base', label: 'md' },
		{ value: 'text-lg', label: 'lg' },
		{ value: 'text-xl', label: 'xl' }
	];
	import Radio from './Radio.svelte';
</script>

<Radio bind:selected={size} {options} />
