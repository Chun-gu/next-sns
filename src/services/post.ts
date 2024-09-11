import { postRepository } from "@/repositories/post";

import type { IPostRepository } from "@/repositories/post";
import type { CreatePostParam, Post, UpdatePostParam } from "@/resources/post";

class PostService {
	constructor(private postRepository: IPostRepository) {}

	async createPost(param: CreatePostParam): Promise<Post["id"]> {
		return this.postRepository.createPost(param);
	}

	async getPost(id: Post["id"]): Promise<Post | null> {
		return this.postRepository.getPostById(id);
	}

	async getPosts(): Promise<Array<Post>> {
		return this.postRepository.getPostList();
	}

	async updatePost(param: UpdatePostParam): Promise<void> {
		await this.postRepository.updatePost(param);
	}

	async deletePost(id: Post["id"]): Promise<void> {
		await this.postRepository.deletePost(id);
	}
}

export const postService = new PostService(postRepository);
