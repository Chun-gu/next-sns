import type { User } from "./user";

export interface Comment {
	id: string;
	author: User;
	postId: string;
	content: string;
	createdAt: string;
	updatedAt: string | null;
}
