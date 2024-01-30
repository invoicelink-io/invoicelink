import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
const { SENDGRID_API_KEY, SENDGRID_CONTACT_LIST_ID } = env;
import client from '@sendgrid/client';

client.setApiKey(SENDGRID_API_KEY as string);

export const addUserToMailingList = async (user: { email: string; name: string }) => {
	if (!dev) {
		// create a new sendgrid contact
		const data = {
			list_ids: [SENDGRID_CONTACT_LIST_ID],
			contacts: [
				{
					email: user.email,
					first_name: user.name
				}
			]
		};

		await client
			.request({
				url: `/v3/marketing/contacts`,
				method: 'PUT' as const,
				body: data
			})
			.then(([response]) => {
				console.log(response.statusCode, response.body);
			})
			.catch((error) => {
				console.error(error);
			});
	} else {
		console.log(`DEV: We would only create a contact for ${user.email} in PROD`);
	}
};
