// import {
//   User,
//   Post,
//   type UserType,
//   type UpsertUser,
//   type InsertPost,
//   type PostType,
//   type PostWithAuthor,
// } from "@shared/schema";
// import connectToDatabase from "./db";

// // Interface for storage operations
// export interface IStorage {
//   // User operations
//   // (IMPORTANT) these user operations are mandatory for Replit Auth.
//   getUser(id: string): Promise<UserType | undefined>;
//   upsertUser(user: UpsertUser): Promise<UserType>;
  
//   // Post operations
//   createPost(post: InsertPost, authorId: string): Promise<PostType>;
//   getAllPosts(): Promise<PostWithAuthor[]>;
//   getPostsByUserId(userId: string): Promise<PostWithAuthor[]>;
//   getUserByEmail(email: string): Promise<UserType | undefined>;
// }

// export class DatabaseStorage implements IStorage {
//   // User operations
//   // (IMPORTANT) these user operations are mandatory for Replit Auth.

//   async getUser(id: string): Promise<UserType | undefined> {
//     await connectToDatabase();
//     const user = await User.findOne({ id }).lean();
//     return user ? {
//       _id: user._id?.toString(),
//       id: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       profileImageUrl: user.profileImageUrl,
//       bio: user.bio,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     } : undefined;
//   }

//   async getUserByEmail(email: string): Promise<UserType | undefined> {
//     await connectToDatabase();
//     const user = await User.findOne({ email }).lean();
//     return user ? {
//       _id: user._id?.toString(),
//       id: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       profileImageUrl: user.profileImageUrl,
//       bio: user.bio,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     } : undefined;
//   }

//   async upsertUser(userData: UpsertUser): Promise<UserType> {
//     await connectToDatabase();
//     const user = await User.findOneAndUpdate(
//       { id: userData.id },
//       { 
//         ...userData,
//         updatedAt: new Date(),
//       },
//       { 
//         upsert: true, 
//         new: true,
//         lean: true 
//       }
//     );
    
//     if (!user) {
//       throw new Error('Failed to upsert user');
//     }
    
//     return {
//       _id: user._id?.toString(),
//       id: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       profileImageUrl: user.profileImageUrl,
//       bio: user.bio,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     };
//   }

//   // Post operations
//   async createPost(post: InsertPost, authorId: string): Promise<PostType> {
//     await connectToDatabase();
//     const newPost = await Post.create({
//       ...post,
//       authorId,
//     });

//     return {
//       _id: newPost._id?.toString(),
//       content: newPost.content,
//       authorId: newPost.authorId,
//       createdAt: newPost.createdAt,
//       updatedAt: newPost.updatedAt,
//     };
//   }

//   async getAllPosts(): Promise<PostWithAuthor[]> {
//     await connectToDatabase();
//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .lean();

//     const postsWithAuthors: PostWithAuthor[] = [];
    
//     for (const post of posts) {
//       const author = await User.findOne({ id: post.authorId }).lean();
//       if (author) {
//         postsWithAuthors.push({
//           _id: post._id?.toString(),
//           content: post.content,
//           authorId: post.authorId,
//           createdAt: post.createdAt,
//           updatedAt: post.updatedAt,
//           author: {
//             _id: author._id?.toString(),
//             id: author.id,
//             email: author.email,
//             firstName: author.firstName,
//             lastName: author.lastName,
//             profileImageUrl: author.profileImageUrl,
//             bio: author.bio,
//             createdAt: author.createdAt,
//             updatedAt: author.updatedAt,
//           }
//         });
//       }
//     }

//     return postsWithAuthors;
//   }

//   async getPostsByUserId(userId: string): Promise<PostWithAuthor[]> {
//     await connectToDatabase();
//     const posts = await Post.find({ authorId: userId })
//       .sort({ createdAt: -1 })
//       .lean();

//     const author = await User.findOne({ id: userId }).lean();
    
//     if (!author) {
//       return [];
//     }

//     return posts.map(post => ({
//       _id: post._id?.toString(),
//       content: post.content,
//       authorId: post.authorId,
//       createdAt: post.createdAt,
//       updatedAt: post.updatedAt,
//       author: {
//         _id: author._id?.toString(),
//         id: author.id,
//         email: author.email,
//         firstName: author.firstName,
//         lastName: author.lastName,
//         profileImageUrl: author.profileImageUrl,
//         bio: author.bio,
//         createdAt: author.createdAt,
//         updatedAt: author.updatedAt,
//       }
//     }));
//   }
// }

// export const storage = new DatabaseStorage();
