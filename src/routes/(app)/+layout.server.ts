import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { lucia } from '$lib/server/auth';

import { incrementSerialNumber, initializeSerialNumber } from '$lib/utils/serialNumbers';
import { SerialType } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { quickLinkSchema } from './validation';

export const load = (async ({ cookies }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		redirect(303, '/login');
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (!session) {
		redirect(303, '/login');
	}

	const quickLink = {
		id: '',
		serial: initializeSerialNumber(SerialType.QUICK_LINK),
		amount: 100,
		description: ''
	};

	if (user) {
		const userProfile = await prisma.user.findUnique({
			where: {
				id: user?.id
			},
			include: {
				lastUsedSerial: true
			}
		});

		// get last used serial
		const lastSerial = userProfile?.lastUsedSerial.find(
			(s) => s.type === SerialType.QUICK_LINK
		)?.serial;
		quickLink.serial = lastSerial
			? incrementSerialNumber(lastSerial)
			: initializeSerialNumber(SerialType.QUICK_LINK);
	}

	const quickLinkForm = await superValidate(quickLink, zod(quickLinkSchema));

	return {
		session,
		user,
		quickLinkForm
	};
}) satisfies LayoutServerLoad;
