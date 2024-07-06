import {
	doc,
	addDoc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	collection,
	serverTimestamp,
} from "firebase/firestore";

import { firebaseDB } from "@/shared/config/firebase";

import type { Comment } from "@/resources/comment";
import type { Post } from "@/resources/post";
import type { User } from "@/resources/user";

// #MARK: createComment
export async function createComment(
	postId: Post["id"],
	userId: User["id"],
	content: Comment["content"],
): Promise<Comment["id"]> {
	const comment = {
		author: userId,
		content,
		createdAt: serverTimestamp(),
	};

	const commentDocRef = await addDoc(commentCollection(postId), comment);

	return commentDocRef.id;
}

// MARK: getCommentById
export async function getCommentById(
	postId: Post["id"],
	commentd: Comment["id"],
): Promise<Comment | null> {
	const commentDoc = await getDoc(commentDocRef(postId, commentd));

	if (commentDoc.exists() === false) return null;

	const comment = commentDoc.data();

	return {
		id: commentDoc.id,
		...comment,
		createdAt: comment.createdAt.toDate(),
		updatedAt: comment.updatedAt.toDate(),
	} as Comment;
}

// MARK: getCommentsByPostId
export async function getCommentsByPostId(
	postId: Post["id"],
): Promise<Comment[]> {
	const q = query(commentCollection(postId), orderBy("createdAt", "desc"));
	const commentDocs = await getDocs(q);

	return commentDocs.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt.toDate(),
				updatedAt: doc.data().updatedAt.toDate(),
			}) as Comment,
	);
}

// MARK: updateComment
export async function updateComment(
	postId: Post["id"],
	commentId: Comment["id"],
	content: Comment["content"],
): Promise<void> {
	await updateDoc(commentDocRef(postId, commentId), {
		content,
		updatedAt: serverTimestamp(),
	});
}

// MARK:deleteComment
export async function deleteComment(
	postId: Post["id"],
	commentId: Comment["id"],
): Promise<void> {
	await deleteDoc(commentDocRef(postId, commentId));
}

function commentCollection(postId: Post["id"]) {
	return collection(firebaseDB, "post", postId, "comment");
}

function commentDocRef(postId: Post["id"], commentId: Comment["id"]) {
	return doc(firebaseDB, "post", postId, "comment", commentId);
}
