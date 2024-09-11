export {};

// interface Post {
//   id: string;
//   title: string;
//   content: string;
// }

// class PostModel implements Post {
//   public id: string;
//   public title: string;
//   public content: string;

//   constructor(id: string, title: string, content: string) {
//     this.id = id;
//     this.title = title;
//     this.content = content;
//   }
// }

// class PostRepository {
//   private posts: Post[] = [];

//   public findAll(): Post[] {
//     return this.posts;
//   }

//   public findById(id: string): Post {
//     return this.posts.find(post => post.id === id);
//   }

//   public create(title: string, content: string): Post {
//     const id = (Math.random() * 1000).toString();
//     const post = new PostModel(id, title, content);
//     this.posts.push(post);
//     return post;
//   }

//   public update(id: string, title: string, content: string): Post {
//     const post = this.posts.find(post => post.id === id);
//     if (post) {
//       post.title = title;
//       post.content = content;
//     }
//     return post;
//   }

//   public delete(id: string): void {
//     this.posts = this.posts.filter(post => post.id !== id);
//   }
// }

// class PostService {
//   private postRepo: PostRepository;

//   constructor() {
//     this.postRepo = new PostRepository();
//   }

//   public getAllPosts(): Post[] {
//     return this.postRepo.findAll();
//   }

//   public getPostById(id: string): Post {
//     return this.postRepo.findById(id);
//   }

//   public createPost(title: string, content: string): Post {
//     return this.postRepo.create(title, content);
//   }

//   public updatePost(id: string, title: string, content: string): Post {
//     return this.postRepo.update(id, title, content);
//   }

//   public deletePost(id: string): void {
//     return this.postRepo.delete(id);
//   }
// }
