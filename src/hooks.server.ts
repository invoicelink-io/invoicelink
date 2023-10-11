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
	const protectedRoutes = ['/', '/dashboard'];

	if (protectedRoutes.includes(event.url.pathname.toLowerCase())) {
		if (!event.locals.session) {
			throw redirect(303, '/login');
		}
	}

	return await resolve(event);
};

export const handle: Handle = sequence(authHandle, routeProtectionHandler);
