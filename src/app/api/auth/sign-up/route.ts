import { NextResponse, NextRequest } from "next/server";

import { signUpFormSchema } from "@/components/auth/validation";

import type { ZodIssue } from "zod";

// export async function POST(req: NextRequest) {
// 	const data = await req.json();
// 	const parsed = signUpFormSchema.safeParse(data);

// 	if (parsed.success) {
// 		return NextResponse.json({ status: 201 });
// 	} else {
// 		return NextResponse.json({ status: 400, error: parsed.error });
// 	}
// }

// FormData 버전
export async function POST(req: NextRequest) {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const formData = await req.formData();
	const data = Object.fromEntries(formData);
	const parsed = signUpFormSchema.safeParse(data);

	if (parsed.success) {
		return NextResponse.json({ status: 201 });
	} else {
		return NextResponse.json(
			{
				error: parsed.error.flatten((issue: ZodIssue) => ({
					message: issue.message,
				})).fieldErrors,
			},
			{ status: 400 },
		);
	}
}
