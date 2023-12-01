import { dev } from '$app/environment';
import { githubAuth } from "$lib/server/auth";
import { generateState } from "arctic";

export const GET = async ({ cookies }) => {
	const state = generateState();
	const url = await githubAuth.createAuthorizationURL(state);

	// store state
	cookies.set('github_oauth_state', state, {
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
