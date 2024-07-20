import { userRepository } from "@/repositories/user";

import type { IUserRepository } from "@/repositories/user";
import type { CreateUserParam, User } from "@/resources/user";

class UserService {
	constructor(private userRepository: IUserRepository) {}

	async createUser(param: CreateUserParam): Promise<void> {
		await this.userRepository.createUser(param);
	}

	async getUserById(id: User["id"]): Promise<User> {
		return this.userRepository.getUserById(id);
	}

	async getUserByNickname(id: User["id"]): Promise<User> {
		return this.userRepository.getUserByNickname(id);
	}

	// async updateUser(user: User): Promise<void> {
	// 	await this.userRepository.updateUser(user);
	// }

	// async deleteUser(id: string): Promise<void> {
	// 	await this.userRepository.deleteUser(id);
	// }
}

export const userService = new UserService(userRepository);
