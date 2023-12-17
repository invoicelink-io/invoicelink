import { lucia } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	let session = null;
	if (sessionId) {
		session = (await lucia.validateSession(sessionId)).session;
	}
	
	if (!session) {
		return new Response('You are not logged in', {
			status: 302,
			headers: {
				location: '/login?message=You are not logged in'
			}
		});
	}

	await lucia.invalidateSession(session?.id);
	cookies.delete(lucia.sessionCookieName, {
		path: '/'
	});

	return new Response('You have been logged out', {
		status: 302,
		headers: {
			location: '/login?message=You have been logged out'
		}
	});
};
