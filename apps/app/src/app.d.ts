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

	interface Window {
		// Cloudinary types
		cloudinary: {
			createUploadWidget: (
				cldOptions,
				cldCallback
			) => {
				open: () => void;
				close: () => void;
			};
		};
	}

	// eslint-disable-next-line no-var
	var prisma: import('@invoicelink/db').PrismaClient;
}

export {};
