"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUpWithEmail } from "@/features/auth";
import { createImage } from "@/features/image";
import { createUser } from "@/features/user";

import { signUpFormSchema } from "./validation";

import type { FormEvent } from "react";
import type { CreateUserParam } from "@/resources/user";
import type { SignUpFormSchema } from "./validation";
import {
	Form,
	FormControl,
	FormMessage,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
	CurrLength,
	LengthIndicator,
	MaxLength,
} from "@/shared/ui/length-indicator";

export const SignUpFormZod = () => {
	const router = useRouter();
	const form = useForm<SignUpFormSchema>({
		mode: "onChange",
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: "asdf@asdf.com ",
			password: "asdfasdf ",
			nickname: "",
			profileImageName: undefined,
			introduction: "",
		},
	});

	// const profileImageRef = form.register("profileImageName");

	async function handleSubmitSigUpForm(data: SignUpFormSchema) {
		console.log(data);
		// fetch("/api/auth/sign-up", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log(data));
		const formData = new FormData();
		// Object.entries(data).forEach(([key, value]) => {
		// 	formData.append(key, value);
		// });

		const res = await fetch("/api/auth/sign-up", {
			method: "POST",
			body: formData,
		});

		const dt = await res.json();
		console.log(dt);
	}

	const { isValid, isSubmitting } = form.formState;

	// async function handleSubmitRegisterForm(e: FormEvent<HTMLFormElement>) {
	// 	e.preventDefault();

	// 	const formData = new FormData(e.currentTarget);

	// 	const email = formData.get("email") as string;
	// 	const password = formData.get("password") as string;
	// 	const nickname = formData.get("nickname") as string;
	// 	const introduction = formData.get("introduction") as string;
	// 	const profileImage = formData.get("profileImage") as File;

	// 	try {
	// 		const {
	// 			user: { uid },
	// 		} = await signUpWithEmail(email, password);
	// 		const profileImageName = await createImage(profileImage);

	// 		const user: CreateUserParam = {
	// 			id: uid,
	// 			email,
	// 			nickname,
	// 			introduction,
	// 			profileImageName,
	// 		};

	// 		await createUser(user);

	// 		router.push("/login");
	// 	} catch (error) {
	// 		if (error instanceof FirebaseError) alert(error.message);
	// 	}
	// }

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmitSigUpForm)}>
				<fieldset disabled={isSubmitting} className="flex flex-col gap-4">
					{/* <input type='file' {...register('profileImageName')}/> */}
					<FormField
						name="profileImageName"
						control={form.control}
						render={(field) => (
							<FormItem className="bg-red-300">
								<div></div>
								<FormControl>
									<Input
										type="file"
										{...form.register("profileImageName")}
										className="bg-red-400 appearance-none"
									/>
								</FormControl>
								<FormLabel>프로필 사진 (선택)</FormLabel>
								<ul>
									<li>
										<FormDescription>
											png, jpg 유형의 이미지만 등록할 수 있습니다.
										</FormDescription>
									</li>
									<li>
										<FormDescription>
											이미지 크기는 3MB를 초과할 수 없습니다.
										</FormDescription>
									</li>
								</ul>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="email"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>이메일</FormLabel>
								<FormControl>
									<Input placeholder="이메일을 입력해 주세요." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="password"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>비밀번호</FormLabel>
								<ul>
									<li>
										<FormDescription>
											영문 대소문자, 특수문자 포함되어야 합니다.
										</FormDescription>
									</li>
									<li>
										<FormDescription>
											최소 8자, 최대 16자까지 가능합니다.
										</FormDescription>
									</li>
								</ul>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="nickname"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>별명</FormLabel>
								<FormDescription>최대 12자까지 가능합니다.</FormDescription>
								<FormControl>
									<Input
										type="text"
										placeholder="별명을 입력해 주세요."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="introduction"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>소개글 (선택)</FormLabel>
								<FormDescription>
									최대 100자까지 입력 가능합니다.
								</FormDescription>
								<FormControl>
									<Textarea
										placeholder="소개글을 입력해 주세요."
										maxLength={100}
										{...field}
									/>
								</FormControl>
								<LengthIndicator
									currLength={field.value?.length}
									maxLength={100}
								>
									<div className="flex justify-end">
										<CurrLength className="text-blue-400" />
										<MaxLength className="ml-0.5" />
									</div>
								</LengthIndicator>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>

				<Button disabled={isSubmitting || !isValid}>회원가입</Button>
			</form>
		</Form>
	);
};
