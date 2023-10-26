<script lang="ts">
	import Navigation from './Navigation.svelte';
	import Avatar from './ui/Avatar.svelte';
	import { page } from '$app/stores';
	const { avatar_url: src, name } = $page.data.user;

	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import Icon from './Icon.svelte';
	const {
		elements: { menu, item, trigger }
	} = createDropdownMenu();
</script>

<header
	class="flex w-full flex-col items-center border-t-2 border-primary-200 p-4 text-xs shadow shadow-neutral-50 dark:shadow-neutral-400"
>
	<div class="flex w-full max-w-7xl justify-between">
		<div class="flex items-center">
			<a href="/" class="text-sm font-medium">invoicelink.io</a>
			<hr class="mx-4 hidden h-[75%] rotate-[20deg] border-r border-primary-200 sm:flex" />
			<div class="hidden h-full items-center sm:flex">Personal Account</div>
		</div>
		<div class="flex items-center">
			<button use:melt={$trigger}>
				<Avatar {src} {name} />
			</button>
			<div
				class="w-max min-w-[10rem] rounded-lg border border-neutral-50 bg-white py-4 text-xs shadow-lg shadow-neutral-50 dark:border-neutral-500 dark:bg-neutral-400 dark:shadow-neutral-500"
				use:melt={$menu}
			>
				<ul class="flex flex-col">
					<li use:melt={$item}>
						<a
							class="flex w-full items-center justify-between px-2 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-300"
							href="/settings"
							><span>Settings</span>
							<Icon name="settings" />
						</a>
					</li>
					<li use:melt={$item}>
						<form class="m-0 h-auto w-full p-0" method="POST" action="/logout">
							<button
								class="flex w-full items-center justify-between px-2 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-300"
								type="submit">Logout</button
							>
						</form>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<Navigation />
</header>
