"use client";

import { useRouter } from "next/navigation";

import { signOut } from "@/features/auth";

export function SignOutButton() {
	const router = useRouter();

	async function onClickSignOutButton() {
		await signOut();

		router.refresh();
	}

	return <button onClick={onClickSignOutButton}>로그아웃</button>;
}
