import Link from "next/link";

import { getTokens } from "@/features/auth";

import { SignOutButton } from "./auth/sign-out-button";
import type { ComponentProps } from "react";
import { UserProfileMenu } from "./user/user-profile-menu";

type HeaderProps = ComponentProps<"header">;

export async function Header({ className }: HeaderProps) {
	const tokens = await getTokens();
	const isSignedIn = tokens !== null;

	return (
		<header className={`flex justify-between ${className}`}>
			<Link href={"/"} className="underline text-blue-400">
				Home
			</Link>

			{isSignedIn && <SignOutButton />}
			<UserProfileMenu />
		</header>
	);
}
