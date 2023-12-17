// src/hooks.server.ts
import { lucia } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// TODO: Remove this if lucia type is updated
interface CookieAttributes {
	secure?: boolean;
	path: string;
	domain?: string;
	sameSite?: 'lax' | 'strict' | 'none';
	httpOnly?: boolean;
	maxAge?: number;
	expires?: Date;
}

export const authHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes as CookieAttributes
		);
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes as CookieAttributes
		);
	}
	event.locals.user = user;
	return resolve(event);
};

export const routeProtectionHandler: Handle = async ({ resolve, event }) => {
	const protectedRoutes = ['/', '/clients', '/invoices', '/integrations', '/'];

	if (protectedRoutes.includes(event.url.pathname.toLowerCase())) {
		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (sessionId) {
			const { session } = await lucia.validateSession(sessionId);
			if (!session) {
				redirect(303, '/login');
			}
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
