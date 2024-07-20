import type { DocumentReference, Timestamp } from "firebase/firestore";
// import type { KeysOfValue } from "@/shared/lib/type";
import type { Post } from "./post";
import type { User } from "./user";

export interface Comment {
	id: string;
	author: User;
	postId: Post["id"];
	content: string;
	createdAt: Date;
	updatedAt: Date | null;
}

// MARK: Create Comment
export interface CreateCommentReq
	extends Pick<Comment, "author" | "postId" | "content"> {}

// MARK: Get Comment
export interface GetCommentRes extends Pick<Comment, "postId" | "content"> {
	author: DocumentReference;
	createdAt: Timestamp;
	updatedAt: Timestamp | null;
}

export class GetCommentResDTO {
	constructor(private param: GetCommentRes) {}

	toPlainObj() {
		return {
			postId: this.param.postId,
			content: this.param.content,
			createdAt: this.param.createdAt.toDate(),
			updatedAt: this.param.updatedAt?.toDate() ?? null,
		};
	}

	// async populate() {
	// 	// fields: Array<Field<KeysOfValue<CommentRes, DocumentReference>>>, // fields: Array<KeysOfValue<CommentRes, DocumentReference>>,

	// 	if (this.querySnapshot.empty) return [];

	// 	const promisedComments = this.querySnapshot.docs.map(async (doc) => {
	// 		// for (const key of Object.keys(doc.data()) as (keyof CommentRes)[]) {
	// 		// if(fields.includes(key)){}
	// 		// }
	// 		const comment = doc.data() as CommentRes;
	// 		const author = await getUserById(comment.author.id);

	// 		return {
	// 			id: doc.id,
	// 			...comment,
	// 			createdAt: comment.createdAt.toDate(),
	// 			updatedAt: comment.updatedAt?.toDate() ?? null,
	// 			author,
	// 		};
	// 	});

	// 	// TODO: 범용적인 인터페이스 설계
	// 	// const promises: Array<Promise<any>> = [];

	// 	// data.forEach((datum) => {
	// 	// 	const refs = {};
	// 	// 	for (const [key, value] of Object.entries(datum)as Entries<CommentRes>) {
	// 	// 		if (isKeyOf(fieldToPath, key)) promises.push(getDoc(value));
	// 	// 	}
	// 	// });

	// 	// const promised = this.querySnapshot.docs.map((commentDoc) => {
	// 	// 	for (const [field, data] of Object.entries(commentDoc.data())as Entries<CommentRes>) {
	// 	// 		if (isKeyOf(fieldToPath, field)) {
	// 	// 			return getDoc(data);
	// 	// 		}
	// 	// 	}
	// 	// });

	// 	const comments = Promise.allSettled(promisedComments).then((results) =>
	// 		results
	// 			.filter((result) => result.status === "fulfilled")
	// 			.map((result) => result.value),
	// 	);

	// 	return comments;
	// }
}

// type RefFieldToPath<Obj extends object> = {
// 	[Key in KeysOfValue<Obj, DocumentReference>]: string;
// };

// type Field<K extends KeysOfValue<CommentRes, DocumentReference>> = {
// 	field: K;
// 	fallback: Partial<Comment[K]>;
// };
