import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

dotenv.config({
    path: "./config/config.env"
})

const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: 'https://vistagramm.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());



//import routes
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import otherUserRoutes from './routes/otherUserRoutes.js';


// using routes
app.use("/api/v1", postRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', otherUserRoutes);


export default app;

