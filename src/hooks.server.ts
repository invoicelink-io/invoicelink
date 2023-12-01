// src/hooks.server.ts
import { lucia } from "$lib/server/auth";
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const authHandle: Handle = async ({ event, resolve }) => {
	event.locals.lucia = lucia.handleRequest(event);
	return await resolve(event);
};

export const routeProtectionHandler: Handle = async ({ resolve, event }) => {
	const protectedRoutes = ['/', '/clients', '/invoices', '/integrations', '/'];

	if (protectedRoutes.includes(event.url.pathname.toLowerCase())) {
		const { session } = await event.locals.lucia.validate();
		if (!session) {
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

	// always force light theme for these routes
	if (['/pay', '/invoice'].includes(event.url.pathname)) {
		theme = 'light';
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace(`class=""`, `class="${theme}"`)
		});
	}

	return await resolve(event);
};

export const handle: Handle = sequence(authHandle, routeProtectionHandler, themeHandler);
