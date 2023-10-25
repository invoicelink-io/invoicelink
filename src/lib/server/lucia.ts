import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma as client } from '$lib/server/prisma';
import { sveltekit } from 'lucia/middleware';
import { github } from '@lucia-auth/oauth/providers';
import { google } from '@lucia-auth/oauth/providers';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';

export const auth = lucia({
	adapter: prisma(client),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes(databaseUser) {
		return {
			name: databaseUser.name,
			email: databaseUser.email,
			avatar_url: databaseUser.avatar_url
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	scope: ['read:user', 'user:email']
});

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: GOOGLE_REDIRECT_URI,
	scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email'
	]
});
