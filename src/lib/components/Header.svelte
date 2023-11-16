<script lang="ts">
	import { page } from '$app/stores';
	import { getInitials } from '$lib/utils/stringHelpers';
	const { avatar_url, name, email } = $page.data.user;

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

<header class="flex w-full flex-col items-center border-t-2 border-primary-500 p-4 text-xs shadow">
	<div class="flex w-full max-w-7xl justify-between">
		<div class="flex items-center">
			<a href="/" class="text-sm font-medium">invoicelink.io</a>
			<hr
				class="mx-4 !hidden h-[75%] rotate-[20deg] border-r !border-primary-500 border-opacity-100 sm:!flex"
			/>
			<div class="hidden h-full items-center sm:flex">Personal Account</div>
		</div>
		<div class="flex items-center">
			<button class="ml-2" use:popup={profileMenu}>
				<Avatar src={avatar_url} initials={getInitials(name)} width="w-8" rounded="rounded-lg" />
			</button>
			<div class="card w-max p-3 shadow-xl" data-popup="profileMenu">
				<div class="mb-4 flex items-center">
					<Avatar src={avatar_url} initials={getInitials(name)} width="w-10" rounded="rounded-lg" />
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

				<button class="variant-filled-primary btn btn-sm mt-2 w-full" type="button">Upgrade</button>
			</div>
		</div>
	</div>
	<Navigation />
</header>
