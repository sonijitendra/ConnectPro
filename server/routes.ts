// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { setupAuth, isAuthenticated } from "./replitAuth";
// import { insertPostSchema } from "@shared/schema";
// import { z } from "zod";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Auth middleware
//   await setupAuth(app);

//   // Auth routes
//   app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
//     try {
//       const userId = req.user.claims.sub;
//       const user = await storage.getUser(userId);
//       res.json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Failed to fetch user" });
//     }
//   });

//   // Posts routes
//   app.get('/api/posts', async (req, res) => {
//     try {
//       const posts = await storage.getAllPosts();
//       res.json(posts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       res.status(500).json({ message: "Failed to fetch posts" });
//     }
//   });

//   app.post('/api/posts', isAuthenticated, async (req: any, res) => {
//     try {
//       const userId = req.user.claims.sub;
//       const postData = insertPostSchema.parse(req.body);
//       const post = await storage.createPost(postData, userId);
//       res.status(201).json(post);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         res.status(400).json({ message: "Invalid post data", errors: error.errors });
//       } else {
//         console.error("Error creating post:", error);
//         res.status(500).json({ message: "Failed to create post" });
//       }
//     }
//   });

//   app.get('/api/users/:userId/posts', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const posts = await storage.getPostsByUserId(userId);
//       res.json(posts);
//     } catch (error) {
//       console.error("Error fetching user posts:", error);
//       res.status(500).json({ message: "Failed to fetch user posts" });
//     }
//   });

//   app.get('/api/users/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const user = await storage.getUser(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Failed to fetch user" });
//     }
//   });

//   const httpServer = createServer(app);
//   return httpServer;
// }
