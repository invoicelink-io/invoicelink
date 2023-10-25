import { auth, googleAuth } from '$lib/server/lucia';
import { OAuthRequestError } from '@lucia-auth/oauth';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ url, cookies, locals }) => {
	console.log('GET /login/google/callback was called');
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, googleUser, createUser, createKey } =
			await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;

			// check if user exists with email
			const userWithEmail = await prisma.user.findUnique({
				where: {
					email: googleUser.email
				}
			});

			if (userWithEmail) {
				// transform `UserSchema` to `User`
				const user = auth.transformDatabaseUser(userWithEmail);
				await createKey(user.userId);
				return user;
			}

			const user = await createUser({
				attributes: {
					name: googleUser.name,
					email: googleUser.email,
					avatar_url: googleUser.picture
				}
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
