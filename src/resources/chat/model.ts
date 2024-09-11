import type { User } from "../user";

export interface Chat {
	id: string;
	participants: Array<User["id"]>;
	messages: Array<Message>;
	createdAt: Date;
}

export interface Message {
	id: string;
	chatId: Chat["id"];
	sender: User["id"];
	content: string;
	createdAt: Date;
}
