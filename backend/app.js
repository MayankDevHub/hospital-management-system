// import express from "express";
// import { dbConnection } from "./database/dbConnection.js";
// // import { config } from "dotenv";
// import dotenv from "dotenv"
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import fileUpload from "express-fileupload";
// import { errorMiddleware } from "./middlewares/error.js";
// import messageRouter from "./router/messageRouter.js";
// import userRouter from "./router/userRouter.js";
// import appointmentRouter from "./router/appointmentRouter.js";
// import mongoose from "mongoose";

// const app = express();
// // config({ path: "./config.env" });
// // dotenv.config({ path: "./config.env" });
// const db="mongodb+srv://mayankkumar5962:mayank@cluster0.fhxpo2p.mongodb.net/?retryWrites=true"
// const connectDb=async()=>{
//   const database=await mongoose.connect("mongodb://127.0.0.1:27017/DATABASE")
//   console.log (database,"connected")
// }
// Mongoose.set("strictQuery", false);
// connectDb()
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URL],
//     method: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
// app.use("/api/v1/message", messageRouter);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/appointment", appointmentRouter);

// dbConnection();

// app.use(errorMiddleware);
// export default app;

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// MongoDB Atlas URI
const MONGO_URI = "mongodb+srv://mayankkumar5962:mayank@cluster0.fhxpo2p.mongodb.net/appointmentApp?retryWrites=true&w=majority";

// Mongoose config
mongoose.set("strictQuery", false);

// DB connection
const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    console.log(` MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};
connectDb();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"], // update when deploying frontend
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


app.use(errorMiddleware);

export default app;
