import { updateComment } from "@/features/comment";

import type { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";
import type { Comment } from "@/resources/comment";
import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";
import { useRouter } from "next/navigation";

type CommentUpdateFormProps = {
	userId: User["id"] | null;
	postId: Post["id"];
	initialComment: Comment;
	setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export function CommentUpdateForm({
	userId,
	postId,
	initialComment,
	setIsEdit,
}: CommentUpdateFormProps) {
	const router = useRouter();

	function handleClickCancelButton(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		setIsEdit(false);
	}

	async function handleSubmitCommentForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (userId === null) {
			// TODO: 로그인 해야 가능하다는 알림과 이동 선택지 or 애초에 form을 disabled
			return;
		}

		const formData = new FormData(e.currentTarget);
		const content = formData.get("content") as string;

		await updateComment({ postId, commentId: initialComment.id, content });

		setIsEdit(false);
		router.refresh();
	}

	return (
		<form onSubmit={handleSubmitCommentForm}>
			<div className="flex flex-col">
				<label htmlFor="content">댓글</label>
				<textarea
					id="content"
					name="content"
					rows={3}
					required
					defaultValue={initialComment.content}
					className="border resize-none"
				/>
			</div>

			<button className="text-white bg-blue-400 py-2">수정</button>
			<button onClick={handleClickCancelButton}>취소</button>
		</form>
	);
}
