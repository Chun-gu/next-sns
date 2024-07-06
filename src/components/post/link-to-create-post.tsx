import Link from "next/link";

export function LinkToCreatePost() {
	return (
		<Link
			href={"/posts/new"}
			className="group flex justify-center items-center fixed w-16 h-16 rounded-full bg-blue-400 text-white bottom-4 right-4 hover:bg-blue-700"
		>
			<span className="text-3xl group-hover:animate-bounce" aria-hidden>
				✏️
			</span>
			<span className="sr-only">게시글 작성하러 가기</span>
		</Link>
	);
}
