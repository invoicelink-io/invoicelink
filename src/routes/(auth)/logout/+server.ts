import { lucia } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const { session } = await locals.lucia.validate();
	if (!session) {
		return new Response('You are not logged in', {
			status: 302,
			headers: {
				location: '/login?message=You are not logged in'
			}
		});
	} else {
		await lucia.invalidateSession(session?.id);
		locals.lucia.deleteSessionCookie();

		return new Response('You have been logged out', {
			status: 302,
			headers: {
				location: '/login?message=You have been logged out'
			}
		});
	}
};
