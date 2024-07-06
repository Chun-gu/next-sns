import type { Post } from "@/resources/post";

type PostCardProps = { post: Post };

export function PostCard({ post }: PostCardProps) {
	return (
		<div className="flex flex-col">
			<strong>제목: {post.title}</strong>
			<span>작성자: {post.author.nickname}</span>
			<p>{post.content}</p>
			<div>
				<span>🗨️ {post.commentCount}</span>
				<span>👍 {post.likeCount}</span>
			</div>
		</div>
	);
}
