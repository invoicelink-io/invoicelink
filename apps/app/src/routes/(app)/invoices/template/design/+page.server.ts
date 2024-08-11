import { prisma } from '$lib/server/prisma';
import type { InvoiceStyles } from '@invoicelink/db';
import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './validation';
import { defaultStyles } from '@invoicelink/lib/defaults';
import { v2 as cloudinary } from 'cloudinary';
import { arrayBufferToBase64 } from '@invoicelink/lib';

// Return "https" URLs by setting secure: true
cloudinary.config({
	secure: true
});

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

	const form = await superValidate(styles, zod(schema));

	return { user, form, title: 'Design Template' };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));
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

			// grab the screenshot of the template
			const imageUrl = `https://api.invoicelink.io/preview?styleId=${res.id}`;
			const base64image = await fetch(imageUrl)
				.then((res) => res.arrayBuffer())
				.then((buf) => arrayBufferToBase64(buf, 'image/webp'));

			const cloudinaryRes = await cloudinary.uploader.upload(base64image ?? imageUrl, {
				public_id: `${res.id}`,
				overwrite: true,
				invalidate: true,
				folder: 'invoicelink/template-previews'
			});

			await prisma.invoiceStyles.update({
				where: {
					id: res.id
				},
				data: {
					previewSrc: cloudinaryRes?.secure_url
				}
			});

			form.data.id = res.id;
			return message(form, 'Template created');
		}
	},
	update: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			if (form.errors.name) {
				return message(form, 'Longer template name required');
			}
		}

		// create a screenshot of the template

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

			const imageUrl = `https://api.invoicelink.io/preview?styleId=${form.data.id}`;
			const base64image = await fetch(imageUrl)
				.then((res) => res.arrayBuffer())
				.then((buf) => arrayBufferToBase64(buf, 'image/webp'));

			const cloudinaryRes = await cloudinary.uploader.upload(base64image ?? imageUrl, {
				public_id: `${form.data.id}`,
				overwrite: true,
				invalidate: true,
				folder: 'invoicelink/template-previews'
			});

			await prisma.invoiceStyles.update({
				where: {
					id: form.data.id
				},
				data: {
					...form.data,
					userId: user.id,
					previewSrc: cloudinaryRes?.secure_url
				}
			});

			form.data.id = res.id;
			return message(form, 'Template updated');
		}
	},
	delete: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));

		if (user?.id) {
			await prisma.invoiceStyles.delete({
				where: {
					id: form.data.id
				}
			});

			await cloudinary.api.delete_resources([form.data.id], {
				folder: 'invoicelink/template-previews',
				type: 'upload',
				resource_type: 'image'
			});

			form.data = defaultStyles;
			return message(form, 'Template deleted');
		}
	}
};
