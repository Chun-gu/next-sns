import Link from "next/link";

export default function PostNotFound() {
	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="font-extrabold text-3xl my-4">404 Not Found</h1>
			<p>존재하지 않는 게시글입니다.</p>

			<Link
				href="/"
				replace
				className="bg-blue-400 text-white px-4 py-2 block max-w-fit rounded-md"
			>
				메인 페이지로 이동하기
			</Link>
		</div>
	);
}
