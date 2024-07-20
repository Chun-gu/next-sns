import { FirebasePostRepository } from "./firebase";

import type { CreatePostParam, Post, UpdatePostParam } from "@/resources/post";

export interface IPostRepository {
	createPost(param: CreatePostParam): Promise<Post["id"]>;
	getPost(id: Post["id"]): Promise<Post | null>;
	getPosts(): Promise<Array<Post>>;
	updatePost(param: UpdatePostParam): Promise<void>;
	deletePost(id: Post["id"]): Promise<void>;
}

export const postRepository = new FirebasePostRepository();
