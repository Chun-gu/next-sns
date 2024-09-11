"use client";

import { useRouter } from "next/navigation";

import { signInWithEmail } from "@/features/auth";

import type { FormEvent } from "react";

export function SignInForm() {
	const router = useRouter();

	async function handleSubmitSignInForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const userCredential = await signInWithEmail(email, password);

			const idToken = await userCredential.user.getIdToken();

			await fetch("/api/login", {
				headers: { Authorization: `Bearer ${idToken}` },
			});

			router.push("/");
		} catch (e) {}
	}

	return (
		<form onSubmit={handleSubmitSignInForm} className="flex flex-col gap-4">
			<div className="flex flex-col">
				<label htmlFor="email">이메일</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="border text-black"
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="password">비밀번호</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					className="border"
				/>
			</div>

			<button type="submit" className="text-white bg-blue-400 py-2">
				로그인
			</button>
		</form>
	);
}
