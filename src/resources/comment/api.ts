// import {
// 	doc,
// 	addDoc,
// 	getDocs,
// 	updateDoc,
// 	deleteDoc,
// 	query,
// 	orderBy,
// 	collection,
// 	serverTimestamp,
// } from "firebase/firestore";

// import { GetCommentResDTO } from "@/resources/comment";
// import { firebaseDB } from "@/shared/config/firebase";

// import { userDocRef } from "./user";

// import type { Comment } from "@/resources/comment";
// import type { Post } from "@/resources/post";
// import type { User } from "@/resources/user";

// // #MARK: createComment
// // POST /posts/post-id/comments
// type CreateCommentParam = {
// 	userId: User["id"];
// 	postId: Post["id"];
// 	content: Comment["content"];
// };
// class CreateCommentReqDTO {
// 	constructor(private param: CreateCommentParam) {}

// 	toPlainObj() {
// 		return {
// 			author: userDocRef(this.param.userId),
// 			postId: this.param.postId,
// 			content: this.param.content,
// 			createdAt: serverTimestamp(),
// 			updatedAt: null,
// 		};
// 	}
// }

// export async function createComment(
// 	param: CreateCommentParam,
// ): Promise<Comment["id"]> {
// 	const comment = await addDoc(
// 		commentColRef(param.postId),
// 		new CreateCommentReqDTO(param).toPlainObj(),
// 	);

// 	return comment.id;
// }

// // MARK: getCommentsByPostId
// // GET /posts/post-id/comments
// export async function getCommentsByPostId(
// 	postId: Post["id"],
// ): Promise<Comment[]> {
// 	const commentsQuery = query(
// 		commentColRef(postId),
// 		orderBy("createdAt", "desc"),
// 	);

// 	const comments = await getDocs(commentsQuery);

// 	return comments.empty ? [] : new GetCommentResDTO(comments).populate();
// }

// type UpdateCommentParam = {
// 	postId: Post["id"];
// 	commentId: Comment["id"];
// 	content: Comment["content"];
// };
// class UpdateCommentReqDTO {
// 	constructor(private param: UpdateCommentParam) {}

// 	toPlainObj() {
// 		return {
// 			content: this.param.content,
// 			updatedAt: serverTimestamp(),
// 		};
// 	}
// }
// // MARK: updateComment
// // PATCH /posts/post-id/comments/comment-id
// export async function updateComment(param: UpdateCommentParam): Promise<void> {
// 	await updateDoc(
// 		commentDocRef(param.postId, param.commentId),
// 		new UpdateCommentReqDTO(param).toPlainObj(),
// 	);
// }

// // MARK:deleteComment
// // DELETE /posts/post-id/comments/comment-id
// export async function deleteComment(
// 	postId: Post["id"],
// 	commentId: Comment["id"],
// ): Promise<void> {
// 	await deleteDoc(commentDocRef(postId, commentId));
// }

// function commentColRef(postId: Post["id"]) {
// 	return collection(firebaseDB, "post", postId, "comment");
// }

// function commentDocRef(postId: Post["id"], commentId: Comment["id"]) {
// 	return doc(firebaseDB, "post", postId, "comment", commentId);
// }

export {};
