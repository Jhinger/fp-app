export default async function getUsers() {
	try {
		let res = await fetch(`${import.meta.env.VITE_API}/users/`, {
			method: 'GET'
		});

		let val = await res.json();
		if (res.ok) {
			return val;
		} else {
			return new Error('Failed to read users from database');
		}
	} catch (err) {
		return err;
	}
}
