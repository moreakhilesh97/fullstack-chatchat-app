import express from "express";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import {app, server}  from "./lib/socket.js";

import path from "path";


app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

dotenv.config();
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

const Port=process.env.PORT || 3000;

const __dirname = path.resolve();

if(process.env.NODE_ENV==="production"){

    app.use(express.static(path.join(__dirname, "../frontend/dist")));


    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));

    })

}




server.listen(5000, () =>{
    console.log(`Server is started on ${Port}`);
    connectDB();

});