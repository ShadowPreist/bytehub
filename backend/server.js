import path from "path";
import express from 'express';
import productRoute from './routes/productRoute.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import uploadBlogRoute from "./routes/uploadBlogRoute.js";
import blogRoute from "./routes/blogRoute.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';


const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cookie Parser Middleware
app.use(cookieParser());

app.get('/', (req,res) => {
  res.send("API is running...");
})

 const __dirname = path.resolve();
 app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use('/api/products',productRoute);
app.use('/api/blogs', blogRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload/products", uploadRoute);
app.use("/api/upload/blogs", uploadBlogRoute);

//Error Handlers
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, (req,res)=> {
  console.log(`Server is running on port ${PORT}`)
})