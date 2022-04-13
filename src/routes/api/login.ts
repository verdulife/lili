import Admin from '$lib/database/models/admin';

export async function post({ request }) {
	const { email, password } = await request.json();
	let err: string, loggedIn: boolean;

	try {
		const adminMatch = await Admin.findOne({ email });

		if (!adminMatch || adminMatch.password !== password) {
			throw 'Invalid username or password';
		}

		loggedIn = true;
	} catch (error) {
		console.log(error);

		err = error;
		loggedIn = false;
	}

	return {
		status: 200,
		body: {
			err,
			loggedIn
		}
	};
}
