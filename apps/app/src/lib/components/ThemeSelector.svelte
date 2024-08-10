<script lang="ts">
	import { page } from '$app/stores';
	import { themes } from '@invoicelink/lib/utils/defaults';
</script>

<details open={false}>
	<summary>Theme</summary>
	<form method="POST">
		<ul>
			{#each themes as theme}
				<li>
					<button
						formaction="/?/setTheme&theme={theme}&redirectTo={$page.url.pathname}"
						type="submit"
						class:btn-active={$page.data.theme === theme}
						class="capitalize">{theme}</button
					>
				</li>
			{/each}
		</ul>
	</form>
</details>
