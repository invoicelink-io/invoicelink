import { Lucia, TimeSpan } from "lucia";
import { sveltekit } from 'lucia/middleware';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma as client } from '$lib/server/prisma';
import { GitHub, Google } from "arctic";
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';


const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(30, "d"),
	sessionCookie: {
		attributes: {
			secure: !dev,
		}
	},
	middleware: sveltekit(),
	getUserAttributes(attributes) {
		return {
			name: attributes.name,
			email: attributes.email,
			username: attributes.username,
			avatarUrl: attributes.avatarUrl
		};
	}
});


declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			name: string;
			email: string;
			avatarUrl: string;
			username: string;
		};

	}
}


// OAuth providers

export const githubAuth = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
	scope: ['read:user', 'user:email']
});

export const googleAuth = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, {
	scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email'
	]
})
