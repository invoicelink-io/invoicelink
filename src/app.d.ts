declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		interface PageData {
			user?: import('lucia').User | null;
		}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var prisma: import('@prisma/client').PrismaClient;
}

export {};
