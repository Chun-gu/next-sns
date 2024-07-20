import { formatDateByLocale } from "@/shared/lib/date";

import type { Comment } from "@/resources/comment";

type CommentCardProps = { comment: Comment };

export function CommentCard({ comment }: CommentCardProps) {
	return (
		<div>
			<span>작성자: {comment.author.nickname}</span>
			<p>{comment.content}</p>
			<span>{formatDateByLocale(comment.createdAt)}</span>
		</div>
	);
}
