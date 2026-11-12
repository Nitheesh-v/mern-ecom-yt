import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

import  router  from "./routes/authroute.js";
import { prod_router } from "./routes/admin/Product-route.js";


const app=express()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json())

mongoose.connect("mongodb+srv://nitheevellingiri_db_user:nithee03@mernytproj.j3vs8s7.mongodb.net/").then(()=>{
    console.log("connected");
}).catch((e)=>{console.log(e);})



  

// app.use(cors({
//     origin: "http://localhost:5173", // your frontend
//     methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
//     allowedHeaders: "*", // must include Content-Type
//     credentials: true
// }));
// app.use(cors({
//     origin:"http://localhost:5175",
//     methods:['GET','PUT','POST','PATCH','DELETE'],
//     allowedHeaders:[
//         "connect-type",
//         "Authorization",
//         "cache-control",
//         "Expires",
//         "Pragma",
//     ], credentials: true
// }))

app.use("/api/auth", router)
app.use("/api/admin/products",prod_router)


app.listen(5000)