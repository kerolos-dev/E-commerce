import { User } from "../../db/models/auth.js";
import { Tokenmodel } from "../../db/models/token.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "./catshError.js";
import  Jwt  from 'jsonwebtoken';


const  isAuthenticated=catchError(async(req,res,next)=>{
    //   check  token  existence
    let  token =req.headers['token'];
   // check   bearer   key  
   if(!token || !token.startsWith(process.env.BEARER_KYEY))
   return next (new  AppError("Valid  token  is  required !"))
  // extract payload  
  token =token.split(process.env.BEARER_KYEY)[1]
  const  payload=  Jwt.verify(token , process.env.TOKEN_SECRET)
 // check  token  in db  
  const  tokenDB= await  Tokenmodel.findOne({token ,  isValid:true})
  if(!tokenDB) return  next (new  AppError("token  is  invalid  "))
 // check  user  existence  
 const  user= await  User.find(payload.id)
 if(!user) return  next (new  AppError("User  is  invalid  "))
 // pass user 
req.user=user 
 // next
  
  return next()
})






export{
  isAuthenticated
}