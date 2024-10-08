import { Lucia, TimeSpan } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma as client } from '$lib/server/prisma';
import { GitHub, Google, Apple, type AppleCredentials } from 'arctic';
import { env } from '$env/dynamic/private';
const {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	APPLE_KEY_ID,
	APPLE_CLIENT_ID,
	APPLE_TEAM_ID,
	APPLE_CERTIFICATE,
	APPLE_REDIRECT_URI
} = env;

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(30, 'd'),
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes(attributes) {
		return {
			name: attributes.name,
			email: attributes.email,
			username: attributes.username,
			avatarUrl: attributes.avatarUrl
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	name: string;
	email: string;
	avatarUrl: string;
	username: string;
}

// OAuth providers

export const githubAuth = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const googleAuth = new Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

const credentials: AppleCredentials = {
	keyId: APPLE_KEY_ID,
	clientId: APPLE_CLIENT_ID,
	teamId: APPLE_TEAM_ID,
	certificate: APPLE_CERTIFICATE
};
export const appleAuth = new Apple(credentials, APPLE_REDIRECT_URI);
