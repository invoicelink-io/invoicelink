<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const name = data.user?.name || data?.user?.username;
	let greeting = 'Welcome back';
	if (name && name?.trim() !== '') {
		greeting += `, ${name.trim().split(' ').at(0)}`;
	}

	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading={greeting} />
