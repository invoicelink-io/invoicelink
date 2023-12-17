import { dev } from '$app/environment';
import { googleAuth } from '$lib/server/auth';
import { generateCodeVerifier, generateState } from 'arctic';

export const GET = async ({ cookies }) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
		scopes: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	});

	// store state verifier as cookie
	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 10
	});

	// store code verifier as cookie
	cookies.set('code_verifier', codeVerifier, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 10
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
