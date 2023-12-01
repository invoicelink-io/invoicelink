import { lucia, googleAuth } from '$lib/server/auth';
import { OAuth2RequestError } from 'arctic';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ url, cookies, locals }) => {
	const stateCookie = cookies.get('github_oauth_state') ?? null;
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// validate state
	if (!state || !stateCookie || !code || stateCookie !== state) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await googleAuth.validateAuthorizationCode(code);
		const googleUser = await googleAuth.getUser(tokens.accessToken);

		// check if user exists with oauth account
		const existingUser = await prisma.user.findUnique({
			where: {
				email: googleUser.email
			},
			include: {
				oauthAccounts: true
			}
		});

		// if user exists, log in
		if (existingUser) {
			// check if they have a google oauth account
			const googleOauthAccount = existingUser.oauthAccounts.find(
				(oauthAccount) => oauthAccount.providerId === 'google'
			);

			// if not, link it to their account
			if (!googleOauthAccount) {
				await prisma.oauthAccount.create({
					data: {
						providerId: 'google',
						providerUserId: String(googleUser.email),
						user: {
							connect: {
								id: existingUser.id
							}
						}
					}
				});
			}

			// create session
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			return new Response(null, {
				status: 302,
				headers: {
					Location: '/',
					'Set-Cookie': sessionCookie.serialize()
				}
			});
		}

		// create user
		const user = await prisma.user.create({
			data: {
				name: googleUser.name,
				email: googleUser.email,
				username: googleUser.email,
				avatarUrl: googleUser.picture,
				oauthAccounts: {
					create: {
						providerId: 'google',
						providerUserId: googleUser.sub
					}
				}
			}
		});

		// create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				'Set-Cookie': sessionCookie.serialize()
			}
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuth2RequestError) {
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
