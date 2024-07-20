import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { v7 as uuid } from "uuid";

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
	createdAt: Date;
	updatedAt: Date | null;
}

// MARK: Create Post
export interface CreatePostParam
	extends Pick<Post, "title" | "content" | "attachedImageNames"> {
	authorId: User["id"];
}

export class CreatePostReqDTO {
	constructor(private readonly param: CreatePostParam) {}

	toPlainObj() {
		return {
			id: uuid(),
			author: this.param.authorId,
			title: this.param.title,
			content: this.param.content,
			attachedImageNames: arrayUnion(...this.param.attachedImageNames),
			comments: arrayUnion(),
			commentCount: 0,
			likeCount: 0,
			createdAt: serverTimestamp(),
			updatedAt: null,
		};
	}
}

// MARK: Get Post
export interface GetPostRes extends Omit<Post, "createdAt" | "updatedAt"> {
	createdAt: Timestamp;
	updatedAt: Timestamp | null;
}

export class GetPostResDTO {
	constructor(private readonly res: GetPostRes) {}

	toPlainObj() {
		return {
			id: this.res.id,
			author: this.res.author,
			title: this.res.title,
			content: this.res.content,
			attachedImageNames: this.res.attachedImageNames ?? [],
			comments: this.res.comments ?? [],
			commentCount: this.res.commentCount ?? 0,
			likeCount: this.res.likeCount ?? 0,
			createdAt: this.res.createdAt.toDate(),
			updatedAt: this.res.updatedAt?.toDate() ?? null,
		};
	}
}

// MARK: Update Post
export interface UpdatePostParam
	extends Partial<Pick<Post, "title" | "content" | "attachedImageNames">> {
	postId: Post["id"];
}

export class UpdatePostReqDTO {
	constructor(private readonly param: UpdatePostParam) {}

	toPlainObj() {
		return {
			title: this.param.title,
			content: this.param.content,
			attachedImageNames: arrayUnion(...(this.param.attachedImageNames ?? [])),
			updatedAt: serverTimestamp(),
		};
	}
}
