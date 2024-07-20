import { FirebaseUserRepository } from "./firebase";

import type { CreateUserParam, User } from "@/resources/user";

export interface IUserRepository {
	createUser(user: CreateUserParam): Promise<void>;
	getUserById(id: User["id"]): Promise<User>;
	getUserByNickname(nickname: User["nickname"]): Promise<User>;
	// updateUser(user: User): Promise<void>;
	// deleteUser(id: User["id"]): Promise<void>;
}

export const userRepository = new FirebaseUserRepository();
