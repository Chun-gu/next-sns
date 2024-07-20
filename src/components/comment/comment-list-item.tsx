"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteComment } from "@/features/comment";

import { CommentCard } from "./comment-card";
import { CommentUpdateForm } from "./comment-update-form";

import type { Comment } from "@/resources/comment";
import type { User } from "@/resources/user";

type CommentListItemProps = { userId: User["id"] | null; comment: Comment };

export function CommentListItem({ userId, comment }: CommentListItemProps) {
	const router = useRouter();
	const [isEdit, setIsEdit] = useState(false);
	const isMine = userId === comment.author.id;

	async function handleClickDeleteCommentButton() {
		await deleteComment(comment.postId, comment.id);

		router.refresh();
	}

	return (
		<div className="outline">
			{isEdit ?
				<CommentUpdateForm
					userId={userId}
					postId={comment.postId}
					initialComment={comment}
					setIsEdit={setIsEdit}
				/>
			:	<CommentCard comment={comment} />}

			{/* 게시글 작성자면 삭제 가능 */}
			{/* 댓글 작성자면 수정, 삭제 가능 */}
			{isMine && !isEdit && (
				<div>
					<button onClick={() => setIsEdit((prev) => !prev)}>수정</button>
					<button onClick={handleClickDeleteCommentButton}>삭제</button>
				</div>
			)}
		</div>
	);
}
