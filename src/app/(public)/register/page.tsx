"use client";

import Link from "next/link";

import { SignUpForm } from "@/components/auth";

export default function RegisterPage() {
	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">회원가입</h1>

			<SignUpForm />

			<Link href="/login" className="underline text-blue-400">
				로그인하러 가기
			</Link>
		</>
	);
}
