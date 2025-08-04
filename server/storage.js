// ./storage.js

import mongoose from 'mongoose';
import { connectToDatabase } from './db.js';

// User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String }, // ✅ Add password field for login/signup
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  bio: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Post Schema
const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  authorId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

export class DatabaseStorage {
  // ✅ Add findUserByEmail method
  async findUserByEmail(email) {
    await connectToDatabase();
    const user = await User.findOne({ email }).lean();
    return user;
  }

  async createUser(userData) {
    await connectToDatabase();
    const user = new User({
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const savedUser = await user.save();
    return savedUser.toObject();
  }

  async getUser(id) {
    await connectToDatabase();
    const user = await User.findOne({ id }).lean();
    return user ? {
      _id: user._id?.toString(),
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } : undefined;
  }

  async upsertUser(userData) {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { id: userData.id },
      {
        ...userData,
        updatedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
        lean: true
      }
    );

    if (!user) {
      throw new Error('Failed to upsert user');
    }

    return {
      _id: user._id?.toString(),
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updateUser(id, updates) {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { id },
      { ...updates, updatedAt: new Date() },
      { new: true, lean: true }
    );

    return user ? {
      _id: user._id?.toString(),
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } : undefined;
  }

  // ✅ POSTS

  async createPost(postData) {
    await connectToDatabase();
    const post = new Post({
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...postData,
    });
    const savedPost = await post.save();
    return savedPost.toObject();
  }

  async getPosts() {
    await connectToDatabase();
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .lean();
    return posts;
  }

  async getPostsByAuthor(authorId) {
    await connectToDatabase();
    const posts = await Post.find({ authorId })
      .sort({ createdAt: -1 })
      .lean();
    return posts;
  }

  async updatePost(id, updates) {
    await connectToDatabase();
    const post = await Post.findOneAndUpdate(
      { id },
      { ...updates, updatedAt: new Date() },
      { new: true, lean: true }
    );
    return post;
  }

  async deletePost(id) {
    await connectToDatabase();
    const result = await Post.findOneAndDelete({ id });
    return !!result;
  }
}

// ✅ Export instance
export const storage = new DatabaseStorage();
