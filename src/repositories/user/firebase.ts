import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";

import { GetUserResDTO } from "@/resources/user";
import { firebaseDB } from "@/shared/config/firebase";

import type { CreateUserParam, GetUserRes, User } from "@/resources/user";
import type { IUserRepository } from ".";

export class FirebaseUserRepository implements IUserRepository {
	async createUser({ id, ...user }: CreateUserParam): Promise<void> {
		await setDoc(userDocRef(id), {
			...user,
			createdAt: serverTimestamp(),
			updatedAt: null,
		});
	}

	async getUserById(id: User["id"]): Promise<User> {
		const userDoc = await getDoc(userDocRef(id));

		if (userDoc.exists() === false) throw new Error();

		const userRes = userDoc.data() as GetUserRes;

		return {
			id,
			...new GetUserResDTO(userRes).toPlainObj(),
		};
	}

	async getUserByNickname(nickname: User["nickname"]): Promise<User> {
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
}

function userCollectionRef() {
	return collection(firebaseDB, "user");
}

function userDocRef(id: User["id"]) {
	return doc(firebaseDB, "user", id);
}
