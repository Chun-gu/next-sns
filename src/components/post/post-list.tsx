import Link from "next/link";

import { getPosts } from "@/features/post";
import { PostCard } from "./post-card";

import type { User } from "@/resources/user";
import { PostListItem } from "./post-list-item";

type PostListProps = { userId: User["id"] | null };

export async function PostList({ userId }: PostListProps) {
	const posts = await getPosts();

	return (
		<ul className="flex flex-col gap-4">
			{posts.map((post) => (
				<li key={post.id} className="border">
					<Link href={`/posts/${post.id}`}>
						<PostListItem post={post} />
					</Link>
				</li>
			))}
		</ul>
	);
}
