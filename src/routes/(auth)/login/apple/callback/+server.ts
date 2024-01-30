import { lucia, appleAuth } from '$lib/server/auth';
import { OAuth2RequestError, type AppleTokens } from 'arctic';
import { prisma } from '$lib/server/prisma';
import type { OauthAccount, User } from '@prisma/client';
import { jwtDecode } from 'jwt-decode';
import { addUserToMailingList } from '$lib/utils/signup';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const state = formData.get('state') as string;
	const code = formData.get('code') as string;

	// on first request, we get the user's info
	const userJSON = formData.get('user');
	const appleUser: {
		id: string;
		name: string;
		email: string;
	} = {
		id: '',
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

		// populate appleUser with claims
		appleUser.id = claims.sub;
		if (appleUser.email === '') {
			appleUser.email = claims.email;
		}

		// check if user exists with oauth account
		let existingUser:
			| (User & {
					oauthAccounts: OauthAccount[];
			  })
			| null = null;

		// check if we can find the user by email
		if (appleUser.email !== '') {
			existingUser = await prisma.user.findUnique({
				where: {
					email: appleUser.email
				},
				include: {
					oauthAccounts: true
				}
			});
		} else if (appleUser.id !== '') {
			existingUser = await prisma.user.findFirst({
				where: {
					oauthAccounts: {
						some: {
							providerId: 'apple',
							providerUserId: appleUser.id
						}
					}
				},
				include: {
					oauthAccounts: true
				}
			});
		}

		if (existingUser) {
			// check if they have a apple oauth account
			const appleOauthAccount = existingUser.oauthAccounts.find(
				(oauthAccount) => oauthAccount.providerId === 'apple'
			);

			// if not, link apple oAuth to their account
			if (!appleOauthAccount) {
				await prisma.oauthAccount.create({
					data: {
						providerId: 'apple',
						providerUserId: String(appleUser.id),
						user: {
							connect: {
								id: existingUser.id
							}
						}
					}
				});
			}

			// otherwise, create a session
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			return new Response(null, {
				status: 302,
				headers: {
					Location: '/?signedIn=true',
					'Set-Cookie': sessionCookie.serialize()
				}
			});
		} else {
			// no user found, create one
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
							providerUserId: String(appleUser.id)
						}
					}
				}
			});

			// add user to mailing list
			await addUserToMailingList({
				email: appleUser.email,
				name: appleUser.name
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
		}
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
