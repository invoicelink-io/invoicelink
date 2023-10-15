<script lang="ts">
	import type { SubmitFunction } from '../../routes/(app)/$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	const submitUpdateTheme: SubmitFunction = ({ action, cancel }) => {
		const theme = action.searchParams.get('theme');
		const currentTheme = document.documentElement.getAttribute('data-theme');

		if (theme) {
			if (currentTheme === theme) {
				// Don't do anything if the theme is already set
				cancel();
			}
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
</script>

<form method="POST" use:enhance={submitUpdateTheme}>
	<ul>
		<li>
			<button formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}"
				>Light Mode
			</button>
		</li>
		<li>
			<button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}"
				>Dark Mode
			</button>
		</li>
	</ul>
</form>
