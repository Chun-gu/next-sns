"use client";

import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";
import {
	PostProvider,
	PostTitle,
	PostAuthor,
	PostContent,
	PostCommentCount,
	PostLikeCount,
	PostEditButton,
	PostDeleteButton,
} from "./post-card";

type Props = { userId: User["id"] | null; post: Post };

export const PostDetail = ({ userId, post }: Props) => {
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
