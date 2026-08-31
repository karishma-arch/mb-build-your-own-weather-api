import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db/schema.js";
import router from "./routes.js/users.routes.js";

export const db = drizzle(process.env.DATABASE_URL, { schema });

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
