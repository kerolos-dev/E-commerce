

import { User } from "../../../db/models/auth.js"
import { catchError } from "../../middilware/catshError.js"
import { AppError } from "../../utils/appError.js"
import  bcrypt  from 'bcryptjs'
import { resetPassTemp, signUpTemp } from "../../utils/htmlTempaltes.js"
import { Tokenmodel } from "../../../db/models/token.js"
import jwt  from 'jsonwebtoken'
import { sendMassega } from "../../utils/sendEmail.js"
import randomstring  from "randomstring";


 const   register=catchError( async(req,res,next)=>{
    // data form
    const { email,password , confrimPassword }=req.body;
    // check  user  existence 
     const  user =await  User.findOne({email})
     if(user)return next(new AppError('user is  existence  to go  logen'))
    // hash password
    const  hashpassword =bcrypt.hashSync(password ,parseInt(process.env.SALT_ROUND))
    //generate token
    const   token=  jwt.sign({email},process.env.TOKEN_SECRET )
       //create  user 
       await  User.create({...req.body, password:hashpassword})
     // confirmationLink 
     const  confirmationLink= `http://localhost:3000/auth/activateAccount/${token}`
     // send  email  
     const sendEmail= await sendMassega({to:email,
       subject:"Active  user",
       text:"Active  user",
       html:signUpTemp(confirmationLink)
      })
     if(!sendEmail) return next(new AppError("Something  went wrong!!!!")) 
     
    // send  response 
    return res.json({success: true ,massega :"Check  you  email !!!!",})
})

const  activateAccount=catchError(async(req,res,next)=>{
  const {token}= req.params
  const {email}= jwt.verify(token,process.env.TOKEN_SECRET)
  // find  user  and  update  ic confirmed
  const user =  await  User.findOneAndUpdate({email}, {isConfirmed:true})
  // check  if  the   user   dosent   exist 
  if(!user) return next(new  AppError("user is  not  found  ", {cause: 404}))  
  //  create a cart  // TODAY
  // send  response 
  return  res.json({success:true ,massega: "try  to  login" })
})
const  logen=catchError(async(req,res,next)=>{
  //  data 
  const  {email ,  password}= req.body
  // check   user  existence 
  const user  =  await  User.findOne({email})
  if(!user)return next(new AppError('Invalid  user! ',  {cause:"404"}))
  // check  is  confirmed 
  if(!user.isConfirmed) return next(new AppError('you  are  not  confirmed  !',  {cause:"404"}))
  //   check  password 
  const  match = bcrypt.compareSync(password ,  user.password , process.env.SALT_ROUND)
  if(!match)return next(new AppError('password  are  not  valid ! ',  {cause:"404"}))
  //genrat  tooken
  const  token=jwt.sign({email , id:User._id}, process.env.TOKEN_SECRET)
  //  save  token  in  token  model 
  await Tokenmodel.create({token , user:User._id})
  // send response 
  return  res.json({success:true ,massega: "success  login  " ,token})
})
const  forgoyPass=  catchError(async(req,res,next)=>{
  //dat  
  const {email}=req.body
  const user = await User.findOne({email})
  if(!user)return next(new AppError('Invalid  user! ',  {cause:"404"}))
    //  generateCode 
    const  forgetCode= randomstring.generate({
      charset:"numeric",
      length:5,
    })
    // save  code
    user.forgetCode =forgetCode
     await  user.save();
    //  send  code  
      const sendForgetCode= await sendMassega({to:email,
        subject:"rest  passowrd",
        text:"rest  passowrd",
        html:resetPassTemp(forgetCode)
       })
      if(!sendForgetCode) return next(new AppError("Something  went wrong!!!!")) 
        //  send response  
      return  res.json({success:true ,massega: "to  go  reset Passowrd " })



}) 
const resetPass=  catchError(async(req,res,next)=>{
  //  data
  const {email ,  forgetCode ,  password}=req.body
   // check   user  existence 
   const user  =  await  User.findOne({email})
   if(!user)return next(new AppError('Invalid  user! ',  {cause:"404"}))
    // check  forgetCode 
  if(forgetCode !==  user.forgetCode) return  next  ( new  AppError("code  is  not  valid ",  {cause :"404"}))
    //hash  password 
   user.password =   bcrypt.hashSync(password ,parseInt(process.env.SALT_ROUND))
  //  Find  all  token  user 
  const  tokens= await  Tokenmodel.find({user :user._id})
  //  invalideta token  
  tokens.forEach( async(token )=>{
    token.isValid =false;
    await token.save()

  })
    //  send response  
    return  res.json({success:true ,massega: "to  go  login  " })



})



export{
    register,
    activateAccount,
    logen,
    forgoyPass,
    resetPass
    
  
}