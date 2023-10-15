<script>
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
</script>

<nav>
	<form method="POST" action="/logout">
		<button type="submit">Logout</button>
	</form>
</nav>

<ThemeSwitch />

<slot />
