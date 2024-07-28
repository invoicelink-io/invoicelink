<script lang="ts">
	import { page } from '$app/stores';
	import { getInitials } from '$lib/utils/stringHelpers';
	import { clickoutside } from '@svelte-put/clickoutside';
	const user = $page.data.user;
	const avatarUrl = user?.avatarUrl;
	const name = user?.name || user?.username || 'No name';
	const email = user?.email;

	import Icon from './Icon.svelte';
	import Avatar from './ui/Avatar.svelte';
	import ThemeSelector from './ThemeSelector.svelte';

	let details: HTMLDetailsElement;
</script>

<details
	bind:this={details}
	use:clickoutside
	on:clickoutside={() => {
		details.removeAttribute('open');
	}}
	class="dropdown dropdown-end"
>
	<summary class="list-none"><Avatar {avatarUrl} placeholder={getInitials(name)} /></summary>
	<ul class="menu dropdown-content z-10 w-64 rounded-box bg-base-200 p-4 shadow">
		<div class="py-2">
			<div class="flex flex-row justify-between">
				<span class="font-medium">{name}</span>
				<span class="badge badge-accent badge-outline text-xs">Pro</span>
			</div>
			{#if email}
				<p class="text-left text-xs">{email}</p>
			{/if}
		</div>
		<hr class="my-4 border border-base-300" />
		<li>
			<a
				on:click={() => {
					details.removeAttribute('open');
				}}
				class="w-full justify-between"
				href="/settings/general"
			>
				<span>Settings</span>
				<Icon name="settings" />
			</a>
		</li>
		<li>
			<form method="POST" action="/logout" class="flex justify-between">
				<button class="flex w-full justify-between" type="submit">
					<span>Logout</span>
					<Icon name="logout" />
				</button>
			</form>
		</li>
		<hr class="my-4 border border-base-300" />
		<li><ThemeSelector /></li>
	</ul>
</details>
