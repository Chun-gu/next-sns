import { deleteDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

import { postDocRef } from "@/features/post";
import { getUserById } from "@/features/user";
import { GetPostResDTO } from "@/resources/post";

import type { GetPostRes, Post } from "@/resources/post";

type Context = {
	params: { postId: Post["id"] };
};

// MARK: getPost
export async function GET(_: Request, context: Context) {
	try {
		const postId = context.params.postId;
		const postDoc = await getDoc(postDocRef(postId));

		if (postDoc.exists()) {
			const post = new GetPostResDTO(postDoc.data() as GetPostRes).toPlainObj();
			post.author = await getUserById(post.author.id);

			return NextResponse.json({ status: 200, data: post });
		} else {
			return NextResponse.json({ status: 404, error: "Not Found" });
		}
	} catch (error) {
		return NextResponse.json({ status: 500, error: "Internal Server Error" });
	}
}

// MARK: updatePost
export async function PATCH(request: Request, context: Context) {
	const postId = context.params.postId;
	const body = await request.json();
}

// MARK: deletePost
export async function DELETE(_: Request, context: Context) {
	const postId = context.params.postId;
	await deleteDoc(postDocRef(postId));
}
