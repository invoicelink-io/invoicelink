import { lucia, googleAuth } from '$lib/server/auth';
import { OAuth2RequestError, type GoogleTokens } from 'arctic';
import { prisma } from '$lib/server/prisma';
import { addUserToMailingList } from '$lib/utils/signup';

export const GET = async ({ url, cookies }) => {
	const stateCookie = cookies.get('google_oauth_state') ?? null;
	const storedCodeVerifier = cookies.get('code_verifier') ?? null;
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// validate state
	if (!state || !stateCookie || !code || !storedCodeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens: GoogleTokens = await googleAuth.validateAuthorizationCode(
			code,
			storedCodeVerifier
		);
		const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser = await response.json();

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
					Location: '/?signedIn=true',
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

		// add user to mailing list
		await addUserToMailingList({
			email: googleUser.email,
			name: googleUser.name
		});

		// create session
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/?signedIn=true&newUser=true&tour=1',
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
