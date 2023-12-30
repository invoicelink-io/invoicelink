<script lang="ts">
	import { page } from '$app/stores';
	import { getInitials } from '$lib/utils/stringHelpers';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	const user = $page.data.user;
	const avatarUrl = user?.avatarUrl;
	const name = user?.name || user?.username || 'No name';
	const email = user?.email;

	import Navigation from './Navigation.svelte';
	import Icon from './Icon.svelte';

	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';

	const profileMenu: PopupSettings = {
		event: 'click',
		target: 'profileMenu',
		placement: 'bottom-end'
	};
</script>

<header
	class="bg-surface-50-900-token border-surface-100-800-token sticky top-0 z-50 flex w-full flex-col items-center border-b border-t-2 border-primary-500 p-4 text-xs"
>
	<div class="flex w-full max-w-7xl justify-between">
		<div class="flex items-center">
			<a href="/" class="text-sm font-medium">invoicelink.io</a>
			<hr
				class="mx-4 !hidden h-[75%] rotate-[20deg] border-r !border-primary-500 border-opacity-100 sm:!flex"
			/>
			<div class="hidden h-full items-center sm:flex">Personal Account</div>
		</div>
		<div class="flex items-center">
			<button class="btn ml-2" use:popup={profileMenu}>
				<Avatar src={avatarUrl} initials={getInitials(name)} width="w-8" rounded="rounded-lg" />
			</button>
			<div class="card w-max p-3 shadow-xl" data-popup="profileMenu">
				<div class="mb-4 flex items-center">
					<Avatar src={avatarUrl} initials={getInitials(name)} width="w-10" rounded="rounded-lg" />
					<div class="ml-2 flex h-full flex-col justify-center">
						<p class="text-left text-sm font-medium">{name}</p>
						{#if email}
							<p class="text-left text-xs">{email}</p>
						{/if}
					</div>
				</div>
				<a class="variant-soft-surface btn btn-sm mb-2 w-full justify-between" href="/settings">
					<span>Settings</span>
					<Icon name="settings" />
				</a>
				<form class="m-0 h-auto w-full p-0" method="POST" action="/logout">
					<button class="variant-soft-surface btn btn-sm w-full justify-between" type="submit">
						<span>Logout</span>
						<Icon name="logout" />
					</button>
				</form>
				<div class="mt-2">
					<LightSwitch />
				</div>
				<button class="variant-filled-primary btn btn-sm mt-2 w-full" type="button">Upgrade</button>
			</div>
		</div>
	</div>
	<Navigation />
</header>
