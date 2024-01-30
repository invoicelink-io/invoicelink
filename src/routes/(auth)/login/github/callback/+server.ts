import { lucia, githubAuth } from '$lib/server/auth';
import { OAuth2RequestError, type GitHubTokens } from 'arctic';
import { prisma } from '$lib/server/prisma';
import type { OauthAccount, User } from '@prisma/client';
import { addUserToMailingList } from '$lib/utils/signup';

export const GET = async ({ url, cookies }) => {
	const stateCookie = cookies.get('github_oauth_state') ?? null;
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// validate state
	if (!state || !stateCookie || !code) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens: GitHubTokens = await githubAuth.validateAuthorizationCode(code);
		const response = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const githubUser = await response.json();

		// fetch github users emails
		if (!githubUser.email) {
			const res = await fetch('https://api.github.com/user/emails', {
				headers: {
					Authorization: `token ${tokens.accessToken}`
				}
			});
			const emails = await res.json();
			const primaryEmail = emails.find((item: { email: string; primary: boolean }) => item.primary);
			githubUser.email = primaryEmail.email;
		}

		// check if user exists with oauth account
		let existingUser:
			| (User & {
					oauthAccounts: OauthAccount[];
			  })
			| null = null;

		// check if we can see the user's email
		if (githubUser.email) {
			// if so, check if they already have an account with that email
			existingUser = await prisma.user.findUnique({
				where: {
					email: githubUser.email
				},
				include: {
					oauthAccounts: true
				}
			});
		} else {
			// if not, check if they already have a github oauth account
			existingUser = await prisma.user.findFirst({
				where: {
					oauthAccounts: {
						some: {
							providerId: 'github',
							providerUserId: String(githubUser.id)
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
			// check if they have a github oauth account
			const githubOauthAccount = existingUser.oauthAccounts.find(
				(oauthAccount) => oauthAccount.providerId === 'github'
			);

			// if not, link it to their account
			if (!githubOauthAccount) {
				await prisma.oauthAccount.create({
					data: {
						providerId: 'github',
						providerUserId: String(githubUser.id),
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
				name: githubUser.name,
				email: githubUser.email,
				username: githubUser.login,
				avatarUrl: githubUser.avatar_url,
				oauthAccounts: {
					create: {
						providerId: 'github',
						providerUserId: String(githubUser.id)
					}
				}
			}
		});

		// add user to mailing list
		await addUserToMailingList({
			email: githubUser.email,
			name: githubUser.name
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
