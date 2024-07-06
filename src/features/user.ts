import {
	addDoc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	collection,
	doc,
	query,
	where,
	serverTimestamp,
} from "firebase/firestore";

import { firebaseDB } from "@/shared/config/firebase";
import { formatDateByLocale } from "@/shared/lib/date";

import type { CreateUserArg, GetUserRes, User } from "@/resources/user";

export async function createUser({
	id,
	...user
}: CreateUserArg): Promise<void> {
	await setDoc(userDocRef(id), {
		...user,
		createdAt: serverTimestamp(),
		updatedAt: null,
	});
}

export async function getUserById(id: User["id"]): Promise<User> {
	const userDoc = await getDoc(userDocRef(id));

	if (userDoc.exists() === false) throw new Error();

	const user = userDoc.data() as GetUserRes;

	return {
		id,
		...user,
		createdAt: formatDateByLocale(user.createdAt.toDate()),
		updatedAt: formatDateByLocale(user.updatedAt.toDate()),
	};
}

export async function getUserByNickname(
	nickname: User["nickname"],
): Promise<User> {
	const userQuery = query(
		userCollectionRef(),
		where("nickname", "==", nickname),
	);
	const userDoc = await getDocs(userQuery);
	const [user] = userDoc.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
			}) as User,
	);

	return user;
}

function userCollectionRef() {
	return collection(firebaseDB, "user");
}

export function userDocRef(id: User["id"]) {
	return doc(firebaseDB, "user", id);
}
