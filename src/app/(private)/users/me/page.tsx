import Image from "next/image";

import { getImageURL } from "@/features/image";
import { getUserByNickname } from "@/features/user";

type UserPageProps = {
	params: { nickname: string };
};

export default async function MePage({ params }: UserPageProps) {
	const { nickname } = params;
	const { email, profileImageName, introduction } =
		await getUserByNickname(nickname);

	return (
		<main>
			<h1 className="font-extrabold text-3xl my-4">내 프로필</h1>
			<Image
				src={await getImageURL(profileImageName)}
				alt={nickname}
				width="200"
				height="200"
			/>
			<p>별명:{nickname}</p>
			<p>이메일:{email}</p>
			<p>소개</p>
			<p>{introduction}</p>
			<button>수정</button>
		</main>
	);
}
