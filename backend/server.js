import express from 'express';
import productRoute from './routes/productRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8000;

connectDB();

const app = express();

app.get('/', (req,res) => {
  res.send("API is running...");
})

app.use('/api/products',productRoute)

//Error Handlers
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, (req,res)=> {
  console.log(`Server is running on port ${PORT}`)
})