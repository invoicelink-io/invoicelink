// src/hooks.server.ts
import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authHandle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	event.locals.session = await event.locals.auth.validate();
	return await resolve(event);
};

export const routeProtectionHandler: Handle = async ({ resolve, event }) => {
	const protectedRoutes = ['/', '/clients', '/invoices', '/integrations', '/'];

	if (protectedRoutes.includes(event.url.pathname.toLowerCase())) {
		if (!event.locals.session) {
			throw redirect(303, '/login');
		}
	}

	return await resolve(event);
};

export const themeHandler: Handle = async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace(`class=""`, `class="${theme}"`)
		});
	}

	return await resolve(event);
};

export const handle: Handle = sequence(authHandle, routeProtectionHandler, themeHandler);
