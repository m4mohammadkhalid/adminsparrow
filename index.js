const express=require("express");
const bodyParser=require('body-parser')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const cors=require('cors')

require('dotenv').config()
const login=require('./routes/loginRoute')
const userRoute=require('./routes/userRoute')
const register=require('./routes/registerRoute')
const category=require('./routes/category')
const tag=require('./routes/tag')
const blog=require('./routes/blog')

const PORT=process.env.PORT || 9000; 
const connection=require("./models/connection");
const { request } = require("express");

connection();
const index=express();
//! middleware
index.use(morgan('dev'))
index.use(bodyParser.urlencoded({ extended: false }));  
index.use(bodyParser.json());
index.use(cookieParser())
index.use(cors())

index.set('views', __dirname + '/views');
//! Route File
index.use(login);
index.use(userRoute);
index.use("/",register);
index.use(category);
index.use(tag);
index.use(blog);


index.listen(PORT,()=>{
    console.log("server start");
})