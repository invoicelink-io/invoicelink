import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma as client } from '$lib/server/prisma';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	adapter: prisma(client),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes(databaseUser) {
		return {
			name: databaseUser.name,
			email: databaseUser.email
		};
	}
});
