"use client";

import Link from "next/link";

import { PostCard } from "./post-card";

import type { Post } from "@/resources/post";

type PostListProps = { posts: Array<Post> };

export function PostList({ posts }: PostListProps) {
	return (
		<ul className="flex flex-col gap-4">
			{posts.map((post) => (
				<li key={post.id} className="border">
					<Link href={`/posts/${post.id}`}>
						<PostCard post={post} />
					</Link>
				</li>
			))}
		</ul>
	);
}
