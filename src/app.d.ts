import type { Session, User } from 'lucia';
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null;
			session: Session | null;
		}
		interface PageData {
			user?: User;
		}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var prisma: PrismaClient;
}

export {};
