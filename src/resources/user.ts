import { serverTimestamp } from "firebase/firestore";

import type { Timestamp } from "firebase/firestore";

export interface User {
	id: string;
	email: string;
	nickname: string;
	introduction: string;
	profileImageName: string;
	createdAt: Date;
	updatedAt: Date | null;
}

// MARK: Create User
export interface CreateUserParam
	extends Omit<User, "createdAt" | "updatedAt"> {}

export class CreateUserReqDTO {
	constructor(private readonly param: CreateUserParam) {}

	toPlainObj() {
		return {
			email: this.param.email,
			nickname: this.param.nickname,
			introduction: this.param.introduction ?? null,
			profileImageName: this.param.profileImageName ?? null,
			createdAt: serverTimestamp(),
			updatedAt: null,
		};
	}
}

// MARK: Get User
export interface GetUserRes
	extends Omit<User, "id" | "createdAt" | "updatedAt"> {
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export class GetUserResDTO {
	constructor(private res: GetUserRes) {}

	toPlainObj() {
		return {
			email: this.res.email,
			nickname: this.res.nickname,
			introduction: this.res.introduction,
			profileImageName: this.res.profileImageName,
			createdAt: this.res.createdAt.toDate(),
			updatedAt: this.res.updatedAt?.toDate() ?? null,
		};
	}
}

export interface UpdateUserParam
	extends Partial<
		Pick<User, "nickname" | "introduction" | "profileImageName">
	> {}

export class UpdateUserReqDTO {
	constructor(private readonly param: UpdateUserParam) {}

	toPlainObj() {
		return {
			nickname: this.param.nickname,
			introdunction: this.param.introduction,
			profileImageName: this.param.profileImageName,
			updatedAt: serverTimestamp(),
		};
	}
}
