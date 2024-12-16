import express  from  'express'; 
import dotenv  from  'dotenv'; 
import { bootstrap } from './src/utils/bootstrap.js';
import { connectDB } from './db/connectDB.js';
import { AppError } from './src/utils/appError.js';
// start  db   
await connectDB() 
dotenv.config();
const  app=express() ;
const  port=process.env.PORT

app.use(express.json())


//  npm  cors     tole  
//CORS
// const  whitelist  =["http://portfor  frontend "]
// app.use((req,res,next)=>{
//     console.log(req.header('origin'));
//     if(req.originalUrl.includes('/auth/activate_account')){
//         res.setHeader("Access-Control-Allow-Origin","*")
//         res.setHeader("Access-Control-Allow-Methods","GET")

//     }
//     if(!whitelist.includes(req.header('origin')))
//         return next  (new AppError("Blocked  By  CORS"))
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Headers","*")
//     res.setHeader("Access-Control-Allow-Methods","*")
//     res.setHeader("Access-Control-Private-Network",true)
//     return  next()

// })


//  bootstrap  app
bootstrap(app) 
//  global  error  handlers  
app.use((error,req,res,next)=>{
    const   statusCode =   error.cause ||  500;  
    return res.status(statusCode).json({
        success:false,
        message: error.message,
        stack:error.stack
    })

})


app.listen(port ,  ()=> console.log("App  is  running on port" + port ))