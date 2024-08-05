<script lang="ts">
	import Navigation from './Navigation.svelte';
	import Menu from './Menu.svelte';
</script>

<header
	class="sticky top-0 z-50 flex w-full flex-col items-center border-b border-t-4 border-b-base-200 border-t-accent bg-base-100 p-4 text-xs"
>
	<div class="flex w-full max-w-7xl justify-between">
		<div class="flex items-center">
			<a href="/" class="text-sm font-medium">invoicelink.io</a>
			<hr
				class="mx-4 !hidden h-[75%] rotate-[20deg] border-r border-accent border-opacity-100 sm:!flex"
			/>
			<div class="hidden h-full items-center sm:flex">Personal Account</div>
		</div>
		<div class="flex items-center">
			<Menu />
		</div>
	</div>
	<Navigation />
</header>
