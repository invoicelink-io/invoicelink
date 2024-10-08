// src/hooks.server.ts
import { lucia } from '$lib/server/auth';
import { redirect, error, json, text, type Handle } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';
import { env } from '$env/dynamic/public';
const { PUBLIC_SENTRY_DSN } = env;
import { sequence } from '@sveltejs/kit/hooks';
import { themes } from '@invoicelink/lib/defaults';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1
});

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
	// Allow access to via the pay subdomain
	// Rewrites will ensure that only the /pay route is accessible via the pay subdomain
	if (event.url.hostname === 'pay.invoicelink.io') {
		return await resolve(event);
	}

	const protectedRoutes = ['/', '/clients', '/invoices', '/integrations', '/settings', '/welcome'];

	if (protectedRoutes.includes('/' + event.url.pathname.toLowerCase()?.split('/')[1])) {
		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (sessionId) {
			const { session } = await lucia.validateSession(sessionId);
			if (!session) {
				redirect(303, '/login');
			}
		} else {
			redirect(303, '/login');
		}
	}

	return await resolve(event);
};

export const themeHandler: Handle = async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get('theme');
	let cookieTheme = event.cookies.get('colortheme') ?? 'light';

	// fix for old cookie values i.e. removed themes
	if (!themes.includes(cookieTheme?.toLowerCase())) {
		cookieTheme = 'light';
	}

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	// always force light theme for these routes
	if (['/invoice'].includes(event.url.pathname)) {
		theme = 'light';
	}

	// always force dark theme for these routes
	if (['/welcome'].includes('/' + event.url.pathname.split('/')[1])) {
		theme = 'dark';
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace(`data-theme=""`, `data-theme="${theme}"`)
		});
	}

	return await resolve(event);
};

// CSRF protection copied from sveltekit but with the ability to turn it off for specific routes.
const csrf =
	(allowedPaths: string[]): Handle =>
	async ({ event, resolve }) => {
		const forbidden =
			event.request.method === 'POST' &&
			event.request.headers.get('origin') !== event.url.origin &&
			isFormContentType(event.request) &&
			!allowedPaths.some((path) => event.url.pathname.startsWith(path));

		if (forbidden) {
			const csrfError = error(
				403,
				`Cross-site ${event.request.method} form submissions are forbidden`
			) as {
				body: { message: string };
				status: number;
			};

			if (event.request.headers.get('accept') === 'application/json') {
				return json(csrfError.body, { status: csrfError.status });
			}
			return text(csrfError.body.message, { status: csrfError.status });
		}

		return resolve(event);
	};

function isContentType(request: Request, ...types: string[]) {
	const type = request.headers.get('content-type')?.split(';', 1)[0].trim() ?? '';
	return types.includes(type);
}
function isFormContentType(request: Request) {
	return isContentType(request, 'application/x-www-form-urlencoded', 'multipart/form-data');
}

export const corsHandle: Handle = async ({ resolve, event }) => {
	const validDomains = /^(.*)?\.?invoicelink\.io$/;
	let cors = '';

	let originDomain = null;
	try {
		originDomain = new URL(event.request.headers.get('origin') || '').hostname;
		if (validDomains.test(originDomain)) {
			cors = `https://${originDomain}`;
		}
	} catch (e) {
		console.log('Invalid origin', e);
	}

	if (event.request.method === 'OPTIONS' && cors) {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Origin': cors,
				'Access-Control-Allow-Headers': '*'
			}
		});
	}

	const response = await resolve(event);
	response.headers.append('Access-Control-Allow-Origin', cors);
	return response;
};

export const handle: Handle = sequence(
	Sentry.sentryHandle(),
	corsHandle,
	// NOTE: Update this when adding more payment gateways
	csrf([
		'/login/apple/callback',
		'/login/google/callback',
		'/login/github/callback',
		'/api/payfast',
		'/api/yoco',
		'/api/stripe',
		'/api/coinbase'
	]),
	authHandle,
	routeProtectionHandler,
	themeHandler
);

export const handleError = Sentry.handleErrorWithSentry();
