<script>
	import Meta from '$lib/components/Meta.svelte';
</script>

<svelte:head>
	<Meta title="Invoicelink.io OAuth" description="Sign in or sign up to invoicelink.io" />
</svelte:head>

<div
	data-theme="dark"
	class="flex h-svh w-full flex-col items-center justify-center px-4 text-base-content"
>
	<img class="mb-2 h-14 w-14" src="/logo.svg" alt="Invoicelink logo" width="128" height="128" />
	<h1 class="mb-4 text-center text-xl font-normal">Welcome to invoicelink.io</h1>
	<slot />
</div>
