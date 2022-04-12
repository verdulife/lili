import '$lib/database/connection';
import Client from '$lib/database/models/client';

export async function get() {
	const clients = await Client.find({});

	return {
		status: 200,
		body: { clients }
	};
}
