"use client";

import { isServer } from "@/shared/lib/utils";
import { z } from "zod";

const FILE_SIZE_LIMIT = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const signUpFormSchema = z.object({
	email: z
		.string({ required_error: "이메일을 입력해 주세요." })
		.trim()
		.email({ message: "이메일 형식을 확인해 주세요." }),
	password: z
		.string({ required_error: "비밀번호를 입력해 주세요." })
		.trim()
		.min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
		.max(16, { message: "비밀번호는 최대 16자까지 가능합니다 ." }),
	nickname: z
		.string({ required_error: "별명을 입력해 주세요." })
		.trim()
		.min(1, { message: "최소 1자 이상이어야 합니다." })
		.max(12, { message: "최대 12자까지 가능합니다." }),
	// profileImageName: z.custom<FileList>().superRefine((fileList, ctx) => {
	// 	if (fileList.length === 0) {
	// 		// ctx.addIssue({
	// 		// 	code: z.ZodIssueCode.custom,
	// 		// 	message: "File must be provided",
	// 		// });
	// 		// return false;
	// 		return true;
	// 	}

	// 	if (!ACCEPTED_IMAGE_TYPES.includes(fileList[0].type)) {
	// 		ctx.addIssue({
	// 			code: z.ZodIssueCode.custom,
	// 			message: "지원하지 않는 형식",
	// 		});
	// 		return false;
	// 	}

	// 	if (fileList[0].size > FILE_SIZE_LIMIT) {
	// 		ctx.addIssue({
	// 			code: z.ZodIssueCode.custom,
	// 			message: "File must be less than 5MB",
	// 		});
	// 		return false;
	// 	}

	// 	return true;
	// }),

	// .optional()
	// .transform(fileList=>fileList?.item(0))
	// .refine(
	// 	(file) =>
	// 		file?.length?
	// 			ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ?
	// 				true
	// 			:	false
	// 		:	true,
	// 	"Invalid file. choose either JPEG or PNG image",
	// )
	// .refine(
	// 	(file) =>
	// 		file.length == 1 ?
	// 			file[0]?.size <= FILE_SIZE_LIMIT ?
	// 				true
	// 			:	false
	// 		:	true,
	// 	"Max file size allowed is 8MB.",
	// ),

	// .transform((fileList) =>
	// 	(fileList?.length ?? 0) > 0 ? fileList?.item(0) : undefined,
	// )
	// // .refine(fileList=>(fileList?.length??0)>0?false:true)
	// .refine((file) => (file === undefined ? true : true))
	// .refine((file) => (file?.size ?? 0) <= FILE_SIZE_LIMIT, {
	// 	message: "file size exceeded",
	// })
	// .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type ?? ""), {
	// 	message: "not supported file type",
	// }),
	// profileImageName: z
	// 	.instanceof(File)
	// 	.refine((f) => f.size < FILE_SIZE_LIMIT, "용량 초과")
	// 	.optional(),
	// profileImageName: (typeof window === "undefined" ?
	// 	z.any()
	// :	z.instanceof(FileList)
	// )
	// 	.refine((files) => files?.length > 0, "필수")
	// 	.refine((files) => {
	// 		const fileExtension = files[0].name.split(".").pop();
	// 		return fileExtension && ACCEPTED_IMAGE_TYPES.includes(fileExtension);
	// 	}, "미지원 이미지 형식"),

	// profileImageName: z
	// 	.instanceof(globalThis.FileList)
	// 	.refine((fl) => fl && fl.length > 0, "필수")
	// 	.transform((fl) => fl[0])
	// 	.refine((f) => f.size <= FILE_SIZE_LIMIT, "용량 초과")
	// 	.refine((f) => ACCEPTED_IMAGE_TYPES.includes(f.type), "미지원 확장자")
	// 	.optional(),
	// isServer() ?
	// 	z.any()
	// :	z
	// 		.instanceof(FileList)
	// 		.refine(
	// 			(fileList) => fileList[0].size <= FILE_SIZE_LIMIT,
	// 			"파일 용량 초과",
	// 		),
	// .custom<FileList>((value) => value instanceof FileList)
	// .refine(
	// 	(fileList) => ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
	// 	"지원하지 않는 확장자입니다.",
	// )
	// .refine((fileList) => (fileList.item(0)?.size ?? 0) <= FILE_SIZE_LIMIT)
	// .optional(),
	// 	.refine(
	// 		(file) => file.size <= FILE_SIZE_LIMIT,
	// 		"이미지 파일 크기는 3MB까지 가능합니다.",
	// 	)
	// 	.optional(),

	introduction: z
		.string()
		.trim()
		.max(100, { message: "소개는 100자까지 가능합니다." })
		.optional(),
	profileImageName: z.custom<FileList>((data) => data instanceof FileList),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
