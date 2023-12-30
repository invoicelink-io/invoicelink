import { lucia, appleAuth } from '$lib/server/auth';
import { OAuth2RequestError, type AppleTokens } from 'arctic';
import { prisma } from '$lib/server/prisma';
import type { OauthAccount, User } from '@prisma/client';
import { jwtDecode } from 'jwt-decode';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const state = formData.get('state') as string;
	const code = formData.get('code') as string;

	// on first request, we get the user's info
	const userJSON = formData.get('user');
	const appleUser: {
		name: string;
		email: string;
	} = {
		name: '',
		email: ''
	};

	if (typeof userJSON === 'string') {
		const user = JSON.parse(userJSON);
		const {
			name: { firstName, lastName },
			email
		} = user;

		appleUser.name = `${firstName} ${lastName}`;
		appleUser.email = email;
	}

	// validate state
	if (!state || !code) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens: AppleTokens = await appleAuth.validateAuthorizationCode(code);

		// validate and extract claims from issued idToken
		const claims = jwtDecode(tokens.idToken) as {
			iss: string;
			aud: string;
			exp: number;
			iat: number;
			sub: string;
			at_hash: string;
			email: string;
			email_verified: string;
			auth_time: number;
			nonce_supported: boolean;
		};

		console.log(claims);

		// check if user exists with oauth account
		let existingUser:
			| (User & {
					oauthAccounts: OauthAccount[];
			  })
			| null = null;

		// check if we can find the user's email
		if (claims && claims.email) {
			existingUser = await prisma.user.findUnique({
				where: {
					email: claims.email
				},
				include: {
					oauthAccounts: true
				}
			});
		} else if (claims && claims.sub) {
			existingUser = await prisma.user.findFirst({
				where: {
					oauthAccounts: {
						some: {
							providerId: 'apple',
							providerUserId: claims.sub
						}
					}
				},
				include: {
					oauthAccounts: true
				}
			});
		}

		// if user exists, log in
		if (existingUser) {
			// check if they have a apple oauth account
			const appleOauthAccount = existingUser.oauthAccounts.find(
				(oauthAccount) => oauthAccount.providerId === 'apple'
			);

			// if not, link it to their account
			if (!appleOauthAccount) {
				await prisma.oauthAccount.create({
					data: {
						providerId: 'apple',
						providerUserId: String(claims.sub),
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
				name: appleUser.name,
				email: appleUser.email,
				username: appleUser.email,
				avatarUrl: null,
				oauthAccounts: {
					create: {
						providerId: 'apple',
						providerUserId: String(claims.sub)
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
