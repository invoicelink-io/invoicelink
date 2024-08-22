import { redirect, type Actions } from '@sveltejs/kit';

export const themeActions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme) {
			cookies.set('colortheme', theme, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/'
			});
		}

		return redirect(303, redirectTo ?? '/');
	}
};
