import { notFound, redirect } from "next/navigation";

import { PostForm } from "@/components/post";
import { getCurrentUser } from "@/features/auth";
import { getPost } from "@/features/post";

import type { Post } from "@/resources/post";

type PostEditPageProps = { params: { postId: Post["id"] } };

export default async function PostEditPage({
	params: { postId },
}: PostEditPageProps) {
	const user = await getCurrentUser();

	if (user === null) redirect("/login");

	const post = await getPost(postId);

	if (post === null) notFound();

	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">게시글 수정</h1>

			<PostForm userId={user.id} initialPostData={post} />
		</>
	);
}
