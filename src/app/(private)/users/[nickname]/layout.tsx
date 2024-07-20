"use client";

import type { User } from "@/resources/user";

type UserPageLayoutProps = {
	children: React.ReactNode;
	params: { nickname: User["nickname"] };
};

export default function UserPageLayout({
	children,
	params: { nickname },
}: UserPageLayoutProps) {
	console.log("nickname page", { nickname });

	return nickname === "me" ?
			<>
				<h1>내 프로필</h1>
				<div>{children}</div>
			</>
		:	<>
				<h1>남 프로필</h1>
				<div>{children}</div>
			</>;
}

class DTO {
	constructor() {}
	async doSome() {}
}
