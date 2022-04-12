import Client from '$lib/database/models/client';

export async function get({ params }) {
	const { client } = params;
	const findClient = (await Client.findOne({ name: client })) || null;

	return {
		status: 200,
		body: { client: findClient }
	};
}
