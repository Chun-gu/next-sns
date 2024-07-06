"use client";

import Link from "next/link";

import { SignInForm } from "@/components/auth";

export default function Login() {
	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">로그인</h1>

			<SignInForm />

			<Link href="/register" className="text-blue-400 underline">
				회원가입하러 가기
			</Link>
		</>
	);
}
