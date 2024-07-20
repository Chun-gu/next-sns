"use client";

import { createComment } from "@/features/comment";
import { revalidatePath } from "@/shared/lib/action";

import type { FormEvent } from "react";
import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";

type CommentCreateFormProps = {
	userId: User["id"] | null;
	postId: Post["id"];
};

export function CommentCreateForm({ userId, postId }: CommentCreateFormProps) {
	async function handleSubmitCommentForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (userId === null) {
			// TODO: 로그인 해야 가능하다는 알림과 이동 선택지 or 애초에 form을 disabled
			return;
		}

		const formData = new FormData(e.currentTarget);
		const content = formData.get("content") as string;

		await createComment({ userId, postId, content });
		revalidatePath(`/posts/${postId}`);
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
					className="border resize-none"
				/>
			</div>

			<button className="text-white bg-blue-400 py-2">작성</button>
		</form>
	);
}
