<script lang="ts">
	export let casing = 'text-base';
	const options = [
		{ value: 'lowercase', label: 'lowercase' },
		{ value: 'capitalize', label: 'capitalize' },
		{ value: 'uppercase', label: 'uppercase' }
	];
	import Radio from './Radio.svelte';
</script>

<Radio bind:selected={casing} {options} />
