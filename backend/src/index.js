import express from "express";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://yourdomain.com" : "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, "../frontend/dist");
    if (fs.existsSync(staticPath)) {
        app.use(express.static(staticPath));
        // Use a specific route instead of wildcard to avoid path-to-regexp issues
        app.get("/", (req, res) => {
            const indexPath = path.join(staticPath, "index.html");
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            } else {
                res.status(500).send("Frontend index.html missing");
            }
        });
        // Fallback for client-side routing
        app.get("/app/*", (req, res) => {
            const indexPath = path.join(staticPath, "index.html");
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            } else {
                res.status(500).send("Frontend index.html missing");
            }
        });
    } else {
        app.get("*", (req, res) => {
            res.status(500).send("Frontend dist folder not found");
        });
    }
}

server.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`);
    connectDB();
});