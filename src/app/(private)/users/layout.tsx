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
	console.log("users page", { nickname });

	return <>{children}</>;
}
