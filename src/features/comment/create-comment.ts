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
