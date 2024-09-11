import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextResponse } from "next/server";

import { postColRef } from "@/features/post";
import { getUserById } from "@/features/user";
import { GetPostResDTO } from "@/resources/post";

import type { GetPostRes } from "@/resources/post";

// MARK: getPosts
export async function GET() {
	try {
		const postsQuery = query(postColRef(), orderBy("createdAt"), limit(20));
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

		return NextResponse.json({ status: 200, data: posts });
	} catch (error) {
		return NextResponse.json({ status: 500, error: "Internal Server Error" });
	}
}
