import { getCurrentUser } from "@/features/auth";
import { getChats } from "@/resources/chat";
import { notFound } from "next/navigation";

export default async function ChatsPage() {
	const user = await getCurrentUser();

	if (user === null) notFound();

	const chats = await getChats(user.id);

	return (
		<>
			<h1>대화</h1>

			<section>
				<h2>대화방 목록</h2>
				<ul>
					<li>대화방 1</li>
					<li>대화방 2</li>
					<li>대화방 3</li>
					<li>대화방 4</li>
					<li>대화방 5</li>
				</ul>
			</section>

			<section>
				<h2>대화방</h2>
				<ul>
					<li>보낸 메시지1</li>
					<li>받은 메시지1</li>
					<li>보낸 메시지2</li>
					<li>받은 메시지2</li>
					<li>보낸 메시지3</li>
				</ul>
				<form>
					<textarea name="chat" id="chat" />
				</form>
			</section>
		</>
	);
}
