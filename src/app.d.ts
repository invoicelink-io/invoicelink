import type { AuthRequest, Session, User } from 'lucia';
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthRequest;
			session: Session | null;
		}
		interface PageData {
			user?: User;
		}
		// interface Platform {}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			email: string;
			name: string;
		};
		type DatabaseSessionAttributes = {};
	}

	var prisma: PrismaClient;
}

export {};
