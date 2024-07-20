import { PostList } from "@/components/post";
import { getCurrentUser } from "@/features/auth";

export default async function PostPage() {
	const userId = (await getCurrentUser())?.id ?? null;

	return (
		<>
			<h1>새 게시글</h1>

			<PostList userId={userId} />
		</>
	);
}
