"use client";

import { useRouter } from "next/navigation";

import { deletePost } from "@/features/post";
import { revalidatePath } from "@/shared/lib/action";

import type { ReactNode } from "react";
import type { Post } from "@/resources/post";

type PostDeleteButtonProps = { postId: Post["id"]; children: ReactNode };

export function PostDeleteButton({ postId, children }: PostDeleteButtonProps) {
	const router = useRouter();

	async function handleClickDeletePost() {
		await deletePost(postId);

		revalidatePath("/");
		router.replace("/");
	}

	return <button onClick={handleClickDeletePost}>{children}</button>;
}
