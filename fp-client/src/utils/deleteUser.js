export default async function deleteUser(id) {
    try {
		let res = await fetch(`${import.meta.env.VITE_API}/users/${id}`, {
			method: 'DELETE',
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