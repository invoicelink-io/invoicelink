import { prisma } from '$lib/server/prisma';
import type { InvoiceStyles } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { schema } from './validation';
import { defaultStyles } from '$lib/utils/defaults';

export const load = (async ({ parent, locals, url }) => {
	await parent();
	const { user } = locals;

	const id = url.searchParams.get('id');

	let styles: InvoiceStyles = defaultStyles;

	if (id) {
		const dbStyles = (await prisma.invoiceStyles.findUnique({
			where: {
				id
			}
		})) as InvoiceStyles;

		if (dbStyles) {
			styles = dbStyles;
		}
	}

	const form = await superValidate(styles, schema);

	return { user, form, title: 'Design Template' };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, schema);
		if (!form.valid) {
			if (form.errors.name) {
				return message(form, 'Longer template name required');
			}
		}

		if (user?.id) {
			const res = await prisma.invoiceStyles.create({
				data: {
					...form.data,
					id: undefined,
					userId: user.id
				}
			});

			form.data.id = res.id;
			return message(form, 'Template created');
		}
	},
	update: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, schema);
		if (!form.valid) {
			if (form.errors.name) {
				return message(form, 'Longer template name required');
			}
		}

		if (user?.id) {
			const res = await prisma.invoiceStyles.update({
				where: {
					id: form.data.id
				},
				data: {
					...form.data,
					userId: user.id
				}
			});

			form.data.id = res.id;
			return message(form, 'Template updated');
		}
	},
	delete: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, schema);

		if (user?.id) {
			await prisma.invoiceStyles.delete({
				where: {
					id: form.data.id
				}
			});

			form.data = defaultStyles;
			return message(form, 'Template deleted');
		}
	}
};