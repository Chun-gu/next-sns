import { api } from "@/shared/lib/api";

import type { User } from "../user";
import type { Chat } from "./model";

export async function getChats(userId: User["id"]): Promise<Array<Chat>> {
	return await api(userId);
}
