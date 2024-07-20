"use client";

import { useRouter } from "next/navigation";

import { updatePost } from "@/features/post";
import { revalidatePath } from "@/shared/lib/action";

// import { ImageUploadPreview } from "../image/image-upload-preview";

import type { FormEvent, MouseEvent } from "react";
import type { Post } from "@/resources/post";

type PostFormProps = {
	initialPostData: Post;
};

export const PostUpdateForm = ({ initialPostData }: PostFormProps) => {
	const router = useRouter();

	function handleClickCancelButton(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		router.back();
	}

	async function handleSubmitPostForm(e: FormEvent<HTMLFormElement>) {
		console.log("Hi");
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const title = formData.get("title") as string;
		const content = formData.get("content") as string;
		const postImages = formData.getAll("postImage") as Array<File>;
		const attachedImageNames = [] as Array<string>;

		const post = {
			postId: initialPostData.id,
			title,
			content,
			attachedImageNames,
		};

		await updatePost(post);

		revalidatePath(`/posts/${initialPostData.id}`);
		router.replace(`/posts/${initialPostData.id}`);
	}

	return (
		<form onSubmit={handleSubmitPostForm} className="flex flex-col gap-4">
			<div className="flex flex-col">
				<label htmlFor="title">제목</label>
				<input
					type="text"
					id="title"
					name="title"
					defaultValue={initialPostData.title}
					className="border"
				/>
			</div>

			<div className="flex flex-col">
				<label htmlFor="content">내용</label>
				<textarea
					id="content"
					name="content"
					rows={10}
					required
					defaultValue={initialPostData.content}
					className="border resize-none"
				/>
			</div>

			{/* <ImageUploadPreview multiple /> */}
			{/* <div className="flex flex-col">
				<label htmlFor="postImage">이미지 첨부</label>
				<input
					type="file"
					id="postImage"
					name="postImage"
					accept="image/*"
					multiple
				/>
			</div> */}

			<button className="text-white bg-blue-400 py-2">수정</button>
			<button onClick={handleClickCancelButton}>취소</button>
		</form>
	);
};
