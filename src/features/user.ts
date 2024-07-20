import {
	getDoc,
	getDocs,
	setDoc,
	collection,
	doc,
	query,
	where,
	serverTimestamp,
} from "firebase/firestore";

import { firebaseDB } from "@/shared/config/firebase";

import {
	GetUserResDTO,
	type CreateUserParam,
	type GetUserRes,
	type User,
} from "@/resources/user";

// MARK: Create User
export async function createUser({
	id,
	...user
}: CreateUserParam): Promise<void> {
	await setDoc(userDocRef(id), {
		...user,
		createdAt: serverTimestamp(),
		updatedAt: null,
	});
}

// MARK: Get User By Id
export async function getUserById(id: User["id"]): Promise<User> {
	const userDoc = await getDoc(userDocRef(id));

	if (userDoc.exists() === false) throw new Error();

	const userRes = userDoc.data() as GetUserRes;

	return {
		id,
		...new GetUserResDTO(userRes).toPlainObj(),
	};
}

// MARK: Get User By Nickname
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
