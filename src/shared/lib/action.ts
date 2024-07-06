"use server";

import { revalidatePath as _revalidatePath } from "next/cache";

export async function revalidatePath(
	...args: Parameters<typeof _revalidatePath>
) {
	_revalidatePath(...args);
}
