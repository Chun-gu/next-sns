import {
	PostProvider,
	PostTitle,
	PostAuthor,
	PostContent,
	PostCommentCount,
	PostLikeCount,
} from "./post-card";

import type { Post } from "@/resources/post";

type Props = { post: Post };

export const PostListItem = ({ post }: Props) => {
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
			</div>
		</PostProvider>
	);
};
