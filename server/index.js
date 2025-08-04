import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 5000;

(async () => {
  const app = express();

  // ✅ CORS Middleware (allows frontend to access backend)
  app.use(cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,               // allow cookies if needed
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // ✅ Add simple health-check route
  app.get("/", (_req, res) => {
    res.send("✅ Backend is running!");
  });

  // ✅ Register your API routes
  await registerRoutes(app);

  // ✅ Start the server (only once)
  app.listen(PORT, "0.0.0.0", () => {
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date());

    console.log(`${formattedTime} [express] server running at http://localhost:${PORT}`);
  });
})();
