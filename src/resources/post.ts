import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { v7 as uuid } from "uuid";

import { formatDateByLocale } from "@/shared/lib/date";

import type { Timestamp } from "firebase/firestore";
import type { ImageName } from "@/features/image";
import type { User } from "./user";

export interface Post {
	id: string;
	author: User;
	title: string;
	content: string;
	attachedImageNames: Array<ImageName>;
	comments: Array<Comment>;
	commentCount: number;
	likeCount: number;
	createdAt: string;
	updatedAt: string | null;
}

export type CreatePostArg = Pick<
	Post,
	"title" | "content" | "attachedImageNames"
> & { authorId: User["id"] };

export type UpdatePostArg = { postId: Post["id"] } & Partial<
	Pick<Post, "title" | "content" | "attachedImageNames">
>;

export interface PostRes extends Omit<Post, "createdAt" | "updatedAt"> {
	createdAt: Timestamp;
	updatedAt: Timestamp | null;
}

export class CreatePostDTO {
	constructor(private post: CreatePostArg) {}

	toPlainObj() {
		return {
			id: uuid(),
			author: this.post.authorId,
			title: this.post.title,
			content: this.post.title,
			attachedImageNames: arrayUnion(...this.post.attachedImageNames),
			comments: arrayUnion(),
			commentCount: 0,
			likeCount: 0,
			createdAt: serverTimestamp(),
			updatedAt: null,
		};
	}
}

export class GetPostDTO {
	constructor(private post: PostRes) {}

	toPlainObj(): Post {
		return {
			id: this.post.id,
			author: this.post.author,
			title: this.post.title,
			content: this.post.content,
			attachedImageNames: this.post.attachedImageNames ?? [],
			comments: this.post.comments ?? [],
			commentCount: this.post.commentCount ?? 0,
			likeCount: this.post.likeCount ?? 0,
			createdAt: formatDateByLocale(this.post.createdAt.toDate()),
			updatedAt:
				this.post.updatedAt && formatDateByLocale(this.post.updatedAt.toDate()),
		};
	}
}

export class UpdatePostDTO {
	constructor(private post: UpdatePostArg) {}

	toPlainObj() {
		return {
			title: this.post.title,
			content: this.post.title,
			attachedImageNames: arrayUnion(...(this.post.attachedImageNames ?? [])),
			updatedAt: serverTimestamp(),
		};
	}
}
