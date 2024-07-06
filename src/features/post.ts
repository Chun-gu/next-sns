import {
	addDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	limit,
	setDoc,
	deleteDoc,
	collection,
	updateDoc,
} from "firebase/firestore";

import { CreatePostDTO, GetPostDTO, UpdatePostDTO } from "@/resources/post";
import { firebaseDB } from "@/shared/config/firebase";

import { getUserById, userDocRef } from "./user";

import type {
	Post,
	PostRes,
	CreatePostArg,
	UpdatePostArg,
} from "@/resources/post";

// MARK: createPost
export async function createPost(data: CreatePostArg): Promise<Post["id"]> {
	const post = new CreatePostDTO(data).toPlainObj();

	await setDoc(postDocRef(post.id), {
		...post,
		author: userDocRef(data.authorId),
	});

	return post.id;
}

// MARK: getPost
export async function getPost(id: Post["id"]): Promise<Post | null> {
	try {
		const postDoc = await getDoc(postDocRef(id));

		if (postDoc.exists() === false) throw new Error();

		const post = new GetPostDTO(postDoc.data() as PostRes).toPlainObj();
		post.author = await getUserById(post.author.id);

		return post;
	} catch (error) {
		return null;
	}
}

// MARK: getPosts
export async function getPosts(): Promise<Array<Post>> {
	// TODO: 무한 스크롤 적용
	// const q = query(collection(firebaseDB, "post"),orderBy('createdAt'),limit(20));
	// const postDocs = await getDocs(q);
	const postDocs = await getDocs(postCollectionRef());

	const postPromises = postDocs.docs.map(async (postDoc) => {
		const post = new GetPostDTO(postDoc.data() as PostRes).toPlainObj();
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

// MARK: updatePost
export async function updatePost(data: UpdatePostArg): Promise<void> {
	await updateDoc(
		postDocRef(data.postId),
		new UpdatePostDTO(data).toPlainObj(),
	);
}

// MARK: deletePost
export async function deletePost(id: Post["id"]): Promise<void> {
	await deleteDoc(postDocRef(id));
}

function postDocRef(id: Post["id"]) {
	return doc(firebaseDB, "post", id);
}

function postCollectionRef() {
	return collection(firebaseDB, "post");
}
