import { getCommentsByPostId } from "@/features/comment";

import { CommentListItem } from "./comment-list-item";

import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";

type CommentListProps = { userId: User["id"] | null; postId: Post["id"] };

export async function CommentList({ userId, postId }: CommentListProps) {
	const comments = await getCommentsByPostId(postId);

	return comments.length ?
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>
						<CommentListItem userId={userId} comment={comment} />
					</li>
				))}
			</ul>
		:	<div>댓글이 없습니다.</div>;
}
