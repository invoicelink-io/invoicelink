<script lang="ts">
	export let type = 'Invoice';
	const options = [
		{ value: 'Invoice', label: 'Invoice' },
		{ value: 'Tax Invoice', label: 'Tax Invoice' },
		{ value: 'VAT Invoice', label: 'VAT Invoice' },
		{ value: 'Quote', label: 'Quote' }
	];
	import Radio from './Radio.svelte';
</script>

<Radio bind:selected={type} {options} />
