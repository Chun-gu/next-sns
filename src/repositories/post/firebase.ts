import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	updateDoc,
} from "firebase/firestore";

import {
	CreatePostReqDTO,
	GetPostResDTO,
	UpdatePostReqDTO,
} from "@/resources/post";
import { firebaseDB } from "@/shared/config/firebase";
// TODO: 의존 관계 재조정
import { getUserById } from "@/features/user";

import type {
	CreatePostParam,
	GetPostRes,
	Post,
	UpdatePostParam,
} from "@/resources/post";
import type { IPostRepository } from ".";

export class FirebasePostRepository implements IPostRepository {
	async createPost(param: CreatePostParam): Promise<Post["id"]> {
		const post = new CreatePostReqDTO(param).toPlainObj();

		await setDoc(postDocRef(post.id), {
			...post,
			author: userDocRef(param.authorId),
		});

		return post.id;
	}

	async getPostById(id: Post["id"]): Promise<Post | null> {
		const postDoc = await getDoc(postDocRef(id));

		if (postDoc.exists() === false) throw new Error("존재하지 않는 게시글");

		const post = new GetPostResDTO(postDoc.data() as GetPostRes).toPlainObj();
		post.author = await getUserById(post.author.id);

		return post;
	}

	async getPostList(): Promise<Array<Post>> {
		// TODO: 무한 스크롤 적용
		const postsQuery = query(
			postColRef(),
			orderBy("createdAt", "desc"),
			limit(20),
		);
		const postDocs = await getDocs(postsQuery);

		const postPromises = postDocs.docs.map(async (postDoc) => {
			const post = new GetPostResDTO(postDoc.data() as GetPostRes).toPlainObj();
			post.author = await getUserById(post.author.id);

			return post;
		});

		const posts = Promise.allSettled(postPromises).then((results) =>
			results
				.filter((result) => result.status === "fulfilled")
				.map((result) => result.value),
		);

		return posts;
	}

	async updatePost(param: UpdatePostParam): Promise<void> {
		await updateDoc(
			postDocRef(param.postId),
			new UpdatePostReqDTO(param).toPlainObj(),
		);
	}

	async deletePost(id: Post["id"]): Promise<void> {
		await deleteDoc(postDocRef(id));
	}
}
export function postDocRef(id: Post["id"]) {
	return doc(firebaseDB, "post", id);
}

export function postColRef() {
	return collection(firebaseDB, "post");
}
function userDocRef(authorId: string): any {
	throw new Error("Function not implemented.");
}
