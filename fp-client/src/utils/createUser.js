export default async function createUser(username, biography) {
	try {
		// Fetch UUID from id endpoint.
		let id_data = await fetch(`${import.meta.env.VITE_API}/id/`, {
			method: 'GET',
		});
		let { id } = await id_data.json();

		// Post new User to user endpoint.
		let res = await fetch(`${import.meta.env.VITE_API}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, username, biography })
		});

		let json = await res.json();
		if (res.ok) {
			return json;
		} else {
			return new Error(json.message);
		}
	} catch (err) {
		return err;
	}
}
