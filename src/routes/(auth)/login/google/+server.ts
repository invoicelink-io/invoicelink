import { dev } from '$app/environment';
import { googleAuth } from '$lib/server/auth';
import { generateState } from 'arctic';

export const GET = async ({ cookies }) => {
	const state = generateState();
	const url = await googleAuth.createAuthorizationURL(state);

	// store state
	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
