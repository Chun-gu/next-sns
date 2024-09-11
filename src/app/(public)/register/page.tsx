"use client";

import Link from "next/link";

import { SignUpForm } from "@/components/auth";
import { SignUpFormZod } from "@/components/auth/sign-up-form-zod";

export default function RegisterPage() {
	return (
		<>
			<h1 className="font-extrabold text-3xl my-4">회원가입</h1>

			{/* <SignUpForm /> */}
			<SignUpFormZod />

			<Link href="/login" className="text-blue-400">
				로그인하러 가기
			</Link>
		</>
	);
}
