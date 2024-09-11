export async function api(...args: Parameters<typeof fetch>) {
	try {
		const res = await fetch(...args);
		if (res.ok === false) throw new Error(res.statusText);

		return await res.json();
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
