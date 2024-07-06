import Link from "next/link";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comment";
import { PostDeleteButton } from "@/components/post";
import { getCurrentUser } from "@/features/auth";
import { getPost } from "@/features/post";

import type { Post } from "@/resources/post";

type PostDetailPageProps = {
	params: { postId: Post["id"] };
};

export default async function PostDetailPage({
	params: { postId },
}: PostDetailPageProps) {
	const userId = (await getCurrentUser())?.id;
	const post = await getPost(postId);

	if (post === null) notFound();

	const isMyPost = userId === post.author.id;

	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">{post.title}</h1>

			<span>작성자: {post.author.nickname}</span>
			<p>{post.content}</p>
			<div>
				<span>🗨️ {post.commentCount}</span>
				<span>👍 {post.likeCount}</span>
			</div>
			{isMyPost && (
				<div>
					<Link href={`/posts/${postId}/edit`}>수정</Link>
					<PostDeleteButton postId={postId}>삭제</PostDeleteButton>
				</div>
			)}

			<CommentForm userId={userId} postId={postId} />
		</>
	);
}
