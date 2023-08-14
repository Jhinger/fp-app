export default async function getId() {
	try {
		let res = await fetch(`${import.meta.env.VITE_API}/id/`, {
			method: 'GET'
		});

		let val = await res.json();
		if (res.ok) {
			return val;
		} else {
			return new Error('Failed to read UUID from database.');
		}
	} catch (err) {
		return err;
	}
}
