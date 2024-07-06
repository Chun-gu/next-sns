"use client";

import { createComment, updateComment } from "@/features/comment";

import type { FormEvent } from "react";
import type { Comment } from "@/resources/comment";
import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";

type CommentFormProps = {
	userId?: User["id"];
	postId: Post["id"];
	initialCommentData?: Comment;
};

export function CommentForm({
	userId,
	postId,
	initialCommentData,
}: CommentFormProps) {
	const isEdit = initialCommentData !== undefined;

	async function handleSubmitCommentForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (userId === undefined) return;

		const formData = new FormData(e.currentTarget);
		const content = formData.get("content") as string;

		if (isEdit) {
			updateComment(postId, initialCommentData.id, content);
		} else {
			createComment(postId, userId, content);
		}
	}

	return (
		<form onSubmit={handleSubmitCommentForm}>
			<div className="flex flex-col">
				<label htmlFor="content">댓글</label>
				<textarea
					id="content"
					name="content"
					rows={4}
					required
					defaultValue={initialCommentData?.content}
					className="border resize-none"
				/>
			</div>

			<button className="text-white bg-blue-400 py-2">
				{isEdit ? "수정" : "작성"}
			</button>
		</form>
	);
}
