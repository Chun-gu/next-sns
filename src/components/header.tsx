import Link from "next/link";

import { getTokens } from "@/features/auth";

import { SignOutButton } from "./auth/sign-out-button";

export async function Header() {
	const tokens = await getTokens();
	const isSignedIn = tokens !== null;

	return (
		<header className="flex justify-between border-b">
			<Link href={"/"} className="underline text-blue-400">
				Home
			</Link>

			{isSignedIn && <SignOutButton />}
		</header>
	);
}
