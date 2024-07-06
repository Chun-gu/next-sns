import type { Timestamp } from "firebase/firestore";

export interface User {
	id: string;
	email: string;
	nickname: string;
	introduction: string;
	profileImageName: string;
	createdAt: string;
	updatedAt: string | null;
}

export interface CreateUserArg extends Omit<User, "createdAt" | "updatedAt"> {}

export interface GetUserRes
	extends Omit<User, "id" | "createdAt" | "updatedAt"> {
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
