import Client from '$lib/database/models/client';
import type { ClientEmpty } from '$lib/types';

export async function post({ request }) {
	const { name, image } = await request.json();
	let err = false;
	let data: ClientEmpty;

	try {
		const client = new Client({
			createdAt: new Date(),
			name,
			image
		});

		await client.save();
		data = client;
	} catch (error) {
		err = true;
		data = error.keyValue;
	}

	return {
		status: 200,
		body: { err, data }
	};
}
