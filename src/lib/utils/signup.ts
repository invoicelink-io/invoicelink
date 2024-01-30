import { env } from '$env/dynamic/private';
const { CONVERTKIT_API_SECRET } = env;

export const addUserToMailingList = async (user: { email: string; name: string }) => {
	const res = await fetch('https://api.convertkit.com/v3/tags/4475346/subscribe', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			api_secret: CONVERTKIT_API_SECRET,
			email: user.email,
			first_name: user.name?.split(' ')[0]
		})
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));

	console.log(res);
	return res;
};
