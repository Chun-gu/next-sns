"use client";

import { useRouter } from "next/navigation";

import { createPost, updatePost } from "@/features/post";
import { revalidatePath } from "@/shared/lib/action";

// import { ImageUploadPreview } from "../image/image-upload-preview";

import type { FormEvent } from "react";
import type { User } from "@/resources/user";
import type { Post } from "@/resources/post";

type PostFormProps = {
	userId: User["id"];
	initialPostData?: Post;
};

export function PostForm({ userId, initialPostData }: PostFormProps) {
	const router = useRouter();

	const isEdit = initialPostData !== undefined;

	async function handleSubmitPostForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const title = formData.get("title") as string;
		const content = formData.get("content") as string;
		const postImages = formData.getAll("postImage") as Array<File>;
		const attachedImageNames = [] as Array<string>;

		if (isEdit) {
			const post = {
				postId: initialPostData.id,
				title,
				content,
				attachedImageNames,
			};
			await updatePost(post);

			revalidatePath(`/posts/${initialPostData.id}`);
			router.replace(`/posts/${initialPostData.id}`);
		} else {
			const post = { authorId: userId, title, content, attachedImageNames };
			const postId = await createPost(post);

			revalidatePath("/");
			router.replace(`/posts/${postId}`);
		}
	}

	return (
		<form onSubmit={handleSubmitPostForm} className="flex flex-col gap-4">
			<div className="flex flex-col">
				<label htmlFor="title">제목</label>
				<input
					type="text"
					id="title"
					name="title"
					defaultValue={initialPostData?.title}
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
					defaultValue={initialPostData?.content}
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

			<button className="text-white bg-blue-400 py-2">작성</button>
		</form>
	);
}
