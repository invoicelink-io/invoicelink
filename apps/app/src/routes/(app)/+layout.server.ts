import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { lucia } from '$lib/server/auth';

import { extractLocale } from '@invoicelink/lib';
import { incrementSerialNumber, initializeSerialNumber } from '$lib/utils/serialNumbers';
import { SerialType } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { quickLinkSchema } from './validation';
import { getProfileTasks } from '$lib/utils/profileTasks';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ request, cookies, url }) => {
	const sessionId = cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		redirect(303, '/login');
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (!session) {
		redirect(303, '/login');
	}

	const profileTasks = await getProfileTasks(user?.id);

	const isNewUser = url.searchParams?.get('newUser')?.includes('true') ?? false;
	if (isNewUser && profileTasks.filter((item) => !item.complete).length > 0) {
		redirect(303, '/welcome');
	}

	const quickLink = {
		id: '',
		serial: initializeSerialNumber(SerialType.QUICK_LINK),
		amount: 100,
		description: ''
	};

	let currency = 'USD';
	const locale = extractLocale(request);

	if (user) {
		const userProfile = await prisma.user.findUnique({
			where: {
				id: user?.id
			},
			include: {
				lastUsedSerial: true
			}
		});

		// get last used currency
		if (userProfile?.currency) {
			currency = userProfile?.currency;
		}

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
		currency,
		locale,
		profileTasks,
		quickLinkForm
	};
}) satisfies LayoutServerLoad;
