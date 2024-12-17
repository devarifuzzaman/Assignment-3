import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import router from './src/routes/api.js';
import {DATABASE,PORT,MAX_JSON_SIZE,URL_ENCODED,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME} from './src/config/config.js';


const app = express();

// Global Application Middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
 app.use(limiter);

//Web Caching
 app.set('etag',WEB_CACHE);

 // MongoDB connection
 mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
  console.log("MongoDB connected");
 }).catch(()=>{
  console.log("MongoDB disconnected");
 })


 // Set API Route
 app.use("/api/v1",router);


 // Running Express BackEnd Project
 app.listen(PORT,()=>{
	 console.log(`App web server started on port: ${PORT}`);
 });