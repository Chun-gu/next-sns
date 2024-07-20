import Link from "next/link";

export function LinkToCreatePost() {
	return (
		<div className="h-full invisible absolute bottom-0 right-0 pb-4 pr-4 flex flex-col-reverse">
			<Link
				href={"/posts/new"}
				className="group visible sticky bottom-4 right-4 flex justify-center items-center w-16 h-16 rounded-full bg-blue-400 text-white hover:bg-blue-700"
			>
				<span className="text-3xl group-hover:animate-bounce" aria-hidden>
					✏️
				</span>
				<span className="sr-only">게시글 작성하러 가기</span>
			</Link>
		</div>
	);
}
