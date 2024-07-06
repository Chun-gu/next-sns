import { notFound } from "next/navigation";

import { getPost } from "@/features/post";
import { Dialog } from "@/shared/ui";

import type { Post } from "@/resources/post";

type PostDetailPageProps = {
	params: { postId: Post["id"] };
};

export default async function PostDetailModal({
	params: { postId },
}: PostDetailPageProps) {
	const post = await getPost(postId);

	if (post === null) notFound();

	return (
		<Dialog>
			<h1 className="font-extrabold text-3xl my-4">{post.title}</h1>
			<p>{post.content}</p>
		</Dialog>
	);
}
