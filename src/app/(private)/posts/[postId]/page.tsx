import { notFound } from "next/navigation";

import { getCurrentUser } from "@/features/auth";
import { getPost } from "@/features/post";
import { CommentCreateForm, CommentList } from "@/components/comment";
import { PostDetail } from "@/components/post";

import type { Post } from "@/resources/post";

type PostDetailPageProps = {
	params: { postId: Post["id"] };
};

export default async function PostDetailPage({
	params: { postId },
}: PostDetailPageProps) {
	const userId = (await getCurrentUser())?.id ?? null;
	const post = await getPost(postId);

	if (post === null) notFound();

	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">{post.title}</h1>

			<PostDetail userId={userId} post={post} />

			<CommentCreateForm userId={userId} postId={postId} />
			<CommentList userId={userId} postId={postId} />
		</>
	);
}
