"use client";

import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

import { signUpWithEmail } from "@/features/auth";
import { createImage } from "@/features/image";
import { createUser } from "@/features/user";

import type { FormEvent } from "react";
import type { CreateUserParam } from "@/resources/user";

export function SignUpForm() {
	const router = useRouter();

	async function handleSubmitRegisterForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const nickname = formData.get("nickname") as string;
		const introduction = formData.get("introduction") as string;
		const profileImage = formData.get("profileImage") as File;

		try {
			const {
				user: { uid },
			} = await signUpWithEmail(email, password);
			const profileImageName = await createImage(profileImage);

			const user: CreateUserParam = {
				id: uid,
				email,
				nickname,
				introduction,
				profileImageName,
			};

			await createUser(user);

			router.push("/login");
		} catch (error) {
			if (error instanceof FirebaseError) alert(error.message);
		}
	}

	return (
		<form onSubmit={handleSubmitRegisterForm} className="flex flex-col gap-4">
			<div className="flex flex-col">
				<label htmlFor="profileImage">프로필 이미지</label>
				<input
					type="file"
					id="profileImage"
					name="profileImage"
					accept="image/*"
					required
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="email">이메일</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="border"
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
			<div className="flex flex-col">
				<label htmlFor="nickname">별명</label>
				<input
					type="text"
					id="nickname"
					name="nickname"
					required
					className="border"
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="introduction">소개</label>
				<textarea
					id="introduction"
					name="introduction"
					required
					className="resize-none border"
				/>
			</div>

			<button className="text-white bg-blue-400 py-2">회원가입</button>
		</form>
	);
}
