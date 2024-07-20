"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

import { revalidatePath } from "@/shared/lib/action";
import { deletePost } from "@/features/post";

import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";

type Props = { userId: User["id"] | null; post: Post };

export const PostCard = ({ userId, post }: Props) => {
	const isMine = userId === post.author.id;

	return (
		<PostProvider post={post}>
			<div className="flex flex-col">
				<PostTitle />
				<PostAuthor />
				<PostContent />
				<div>
					<PostCommentCount />
					<PostLikeCount />
				</div>
				{isMine && (
					<div>
						<PostEditButton />
						<PostDeleteButton />
					</div>
				)}
			</div>
		</PostProvider>
	);
};

const postContext = createContext<Post | undefined>(undefined);

export const PostProvider = ({
	post,
	children,
}: {
	post: Post;
	children: React.ReactNode;
}) => {
	return <postContext.Provider value={post}>{children}</postContext.Provider>;
};

function usePostContext() {
	const post = useContext(postContext);
	if (post === undefined) throw new Error();
	else return post;
}

export const PostTitle = () => {
	const { title } = usePostContext();

	return <strong>{title}</strong>;
};

export const PostAuthor = () => {
	const { author } = usePostContext();

	return <span>{author.nickname}</span>;
};

export const PostContent = () => {
	const { content } = usePostContext();

	return <p>{content}</p>;
};

export const PostCommentCount = () => {
	const { commentCount } = usePostContext();

	return <span>🗨️ {commentCount}</span>;
};

export const PostLikeCount = () => {
	const { likeCount } = usePostContext();

	return <span>👍 {likeCount}</span>;
};

export const PostEditButton = () => {
	const { id } = usePostContext();

	return <Link href={`/posts/${id}/edit`}>수정</Link>;
};

export const PostDeleteButton = () => {
	const { id } = usePostContext();
	const router = useRouter();

	async function handleClickDeletePost() {
		await deletePost(id);

		revalidatePath("/posts");
		router.replace("/posts");
	}

	return <button onClick={handleClickDeletePost}>삭제</button>;
};
