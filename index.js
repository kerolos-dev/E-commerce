import express  from  'express'; 
import dotenv  from  'dotenv'; 
import { bootstrap } from './src/utils/bootstrap.js';
import { connectDB } from './db/connectDB.js';
// start  db   
await connectDB() 
dotenv.config();
const  app=express() ;
const  port=process.env.PORT

app.use(express.json())



//  pootstrap  app
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