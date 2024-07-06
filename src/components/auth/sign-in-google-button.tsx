"use client";

import { signInWithGoogle } from "@/features/auth";

export function SignInGoogleButton() {
	async function handleOnClickSignInButton(): Promise<void> {
		try {
			const userCredentials = await signInWithGoogle();
			const accessToken = await userCredentials.user.getIdToken();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<button onClick={handleOnClickSignInButton} className="bg-blue-200">
			구글로 로그인
		</button>
	);
}
