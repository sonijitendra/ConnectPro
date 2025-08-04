import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// Session interface
export interface ISession {
  _id: string;
  expires: Date;
  session: string;
}

// MongoDB User interface
export interface IUser extends Document {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB Post interface
export interface IPost extends Document {
  _id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schemas
const sessionSchema = new Schema<ISession>({
  _id: { type: String, required: true },
  expires: { type: Date, required: true },
  session: { type: String, required: true },
});

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, sparse: true },
  firstName: { type: String },
  lastName: { type: String },
  profileImageUrl: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new Schema<IPost>({
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Mongoose Models
export const Session = mongoose.model<ISession>("Session", sessionSchema);
export const User = mongoose.model<IUser>("User", userSchema);
export const Post = mongoose.model<IPost>("Post", postSchema);

// Zod Validation Schemas
export const insertUserSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
  bio: z.string().optional(),
});

export const insertPostSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const upsertUserSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
  bio: z.string().optional(),
});

// Application Types (for frontend/backend type safety)
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type UserType = {
  _id?: string;
  id: string; // explicitly include `id`
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = {
  _id?: string;
  id: string; // explicitly include `id`
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostWithAuthor = PostType & {
  author: UserType;
};
