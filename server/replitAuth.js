// import * as client from "openid-client";
// import { Strategy } from "openid-client/passport";

// import passport from "passport";
// import session from "express-session";
// import memoize from "memoizee";
// import { storage } from "./storage.js";

// // Skip auth setup in dev
// const isProduction = process.env.NODE_ENV === "production";
// const domains = process.env.REPLIT_DOMAINS || "localhost";
// const replId = process.env.REPL_ID || "dummy-client-id";

// if (isProduction && !process.env.REPLIT_DOMAINS) {
//   throw new Error("Environment variable REPLIT_DOMAINS not provided");
// }

// const getOidcConfig = memoize(
//   async () => {
//     return await client.discovery(
//       new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
//       replId
//     );
//   },
//   { maxAge: 3600 * 1000 }
// );

// export function getSession() {
//   const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week

//   return session({
//     secret: process.env.SESSION_SECRET || "fallback-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: isProduction,
//       maxAge: sessionTtl,
//     },
//   });
// }

// function updateUserSession(user, tokens) {
//   user.claims = tokens.claims();
//   user.access_token = tokens.access_token;
//   user.refresh_token = tokens.refresh_token;
//   user.expires_at = user.claims?.exp;
// }

// async function upsertUser(claims) {
//   await storage.upsertUser({
//     id: claims["sub"],
//     email: claims["email"],
//     firstName: claims["first_name"],
//     lastName: claims["last_name"],
//     profileImageUrl: claims["profile_image_url"],
//   });
// }

// export async function setupAuth(app) {
//   if (!isProduction) {
//     console.log("🟡 Skipping Replit Auth in development mode.");
//     return;
//   }

//   app.set("trust proxy", 1);
//   app.use(getSession());
//   app.use(passport.initialize());
//   app.use(passport.session());

//   const config = await getOidcConfig();

//   const verify = async (tokens, verified) => {
//     const user = {};
//     updateUserSession(user, tokens);
//     await upsertUser(tokens.claims());
//     verified(null, user);
//   };

//   for (const domain of domains.split(",")) {
//     const strategy = new Strategy(
//       {
//         name: `replitauth:${domain}`,
//         config,
//         scope: "openid email profile offline_access",
//         callbackURL: `https://${domain}/api/callback`,
//       },
//       verify
//     );
//     passport.use(strategy);
//   }

//   passport.serializeUser((user, cb) => cb(null, user));
//   passport.deserializeUser((user, cb) => cb(null, user));

//   app.get("/api/login", (req, res, next) => {
//     passport.authenticate(`replitauth:${req.hostname}`, {
//       prompt: "login consent",
//       scope: ["openid", "email", "profile", "offline_access"],
//     })(req, res, next);
//   });

//   app.get("/api/callback", (req, res, next) => {
//     passport.authenticate(`replitauth:${req.hostname}`, {
//       successReturnToOrRedirect: "/",
//       failureRedirect: "/api/login",
//     })(req, res, next);
//   });

//   app.get("/api/logout", (req, res) => {
//     req.logout(() => {
//       res.redirect(
//         client.buildEndSessionUrl(config, {
//           client_id: replId,
//           post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
//         }).href
//       );
//     });
//   });
// }

// export const isAuthenticated = async (req, res, next) => {
//   const user = req.user;

//   if (!req.isAuthenticated() || !user.expires_at) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const now = Math.floor(Date.now() / 1000);
//   if (now <= user.expires_at) {
//     return next();
//   }

//   const refreshToken = user.refresh_token;
//   if (!refreshToken) {
//     res.status(401).json({ message: "Unauthorized" });
//     return;
//   }

//   try {
//     const config = await getOidcConfig();
//     const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
//     updateUserSession(user, tokenResponse);
//     return next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized" });
//     return;
//   }
// };
