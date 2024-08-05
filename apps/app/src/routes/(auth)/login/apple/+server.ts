import { dev } from '$app/environment';
import { appleAuth } from '$lib/server/auth';
import { generateState } from 'arctic';

export const GET = async ({ cookies }) => {
	const state = generateState();
	const url = await appleAuth.createAuthorizationURL(state, {
		scopes: ['email', 'name']
	});
	url.searchParams.set('response_mode', 'form_post');

	// store state
	cookies.set('apple_oauth_state', state, {
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
