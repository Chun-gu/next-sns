import { LinkToCreatePost, PostList } from "@/components/post";
import { getPosts } from "@/features/post";

export default async function MainPage() {
	const posts = await getPosts();

	return (
		<>
			<h1 className="text-3xl m-4">메인 페이지</h1>

			<PostList posts={posts} />

			<LinkToCreatePost />
		</>
	);
}
