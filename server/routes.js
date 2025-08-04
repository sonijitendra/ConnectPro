import { createServer } from "http";
import { storage } from "./storage.js";

export async function registerRoutes(app) {
  // ✅ Root test route
  app.get("/", (req, res) => {
    res.send("🚀 Backend is running!");
  });

    // ✅ Signup route (custom auth)
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Check if user already exists
      const existingUser = await storage.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "User already exists with this email" });
      }

      // Create new user
      const newUser = await storage.createUser({
        email,
        password, // In production, always hash passwords!
        firstName,
        lastName,
        profileImageUrl: null,
        bio: "",
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Signup failed" });
    }
  });

  // ✅ Login route (custom auth)
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.findUserByEmail(email);

      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // 👉 You can issue a token or session cookie here if needed
      res.status(200).json(user);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // ✅ Get user by ID
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // ✅ Update user profile (no auth protection)
  app.patch('/api/users/:id', async (req, res) => {
    try {
      const updatedUser = await storage.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // ✅ Get all posts
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await storage.getPosts();
      const postsWithUsers = await Promise.all(
        posts.map(async (post) => {
          const author = await storage.getUser(post.authorId);
          return {
            ...post,
            author: author || {
              id: post.authorId,
              firstName: "Unknown",
              lastName: "User",
              profileImageUrl: null
            }
          };
        })
      );
      res.json(postsWithUsers);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // ✅ Create new post (no auth check)
  app.post('/api/posts', async (req, res) => {
    try {
      const post = await storage.createPost(req.body);
      const author = await storage.getUser(post.authorId);
      res.status(201).json({
        ...post,
        author
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // ✅ Get posts by a user
  app.get('/api/posts/user/:userId', async (req, res) => {
    try {
      const posts = await storage.getPostsByAuthor(req.params.userId);
      const author = await storage.getUser(req.params.userId);

      const postsWithAuthor = posts.map(post => ({
        ...post,
        author
      }));

      res.json(postsWithAuthor);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ message: "Failed to fetch user posts" });
    }
  });

  // ✅ Update a post (no auth check)
  app.patch('/api/posts/:id', async (req, res) => {
    try {
      const updatedPost = await storage.updatePost(req.params.id, req.body);
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  // ✅ Delete a post (no auth check)
  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const deleted = await storage.deletePost(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  // ✅ Done — return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
