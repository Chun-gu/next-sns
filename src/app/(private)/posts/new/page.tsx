import { redirect } from "next/navigation";

import { PostCreateForm } from "@/components/post";
import { getCurrentUser } from "@/features/auth";

export default async function PostCreatePage() {
	const user = await getCurrentUser();

	if (user === null) redirect("/login");

	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">게시글 작성하기</h1>

			<PostCreateForm userId={user.id} />
		</>
	);
}
