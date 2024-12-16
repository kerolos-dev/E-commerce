

import { User } from "../../../db/models/auth.js"
import { catchError } from "../../middleware/cashError.js";
import { AppError } from "../../utils/appError.js"
import { resetPassTemp, signUpTemp } from "../../utils/htmlTempaltes.js"
import { Tokenmodel } from "../../../db/models/token.js"
import jwt  from 'jsonwebtoken'
import { sendMassa  } from "../../utils/sendEmail.js"
import randomizing  from "randomstring";
import { cartModel } from "../../../db/models/cart.js";
import bcrypt  from'bcrypt';

 const   register=catchError( async(req,res,next)=>{
    // data form
    const { email  }=req.body;
    // check  user  existence 
     const  user =await  User.findOne({email})
     if(user)return next(new AppError('user is  existence  to go  logen'))
    //generate token
    const   token=  jwt.sign({email},process.env.TOKEN_SECRET )

       //create  user 
       await  User.create({...req.body})
     confirmationLink 
     const  confirmationLink= `http://localhost:3001/auth/activateAccount/${token}`
     // send  email  
     const sendEmail= await sendMassa({to:email,
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
  // check  if  the   user   docent   exist 
  if(!user) return next(new  AppError("user is  not  found  ", {cause: 404}))  
  //  create a cart  
   await  cartModel.create({user: user._id})
  // send  response 
  return  res.json({success:true ,massega: "try  to  login" })
})
const logan = catchError(async (req, res, next) => {
  // Extract data from the request body
  const { email, password } = req.body;
  console.log('Plaintext password length:', password.length);

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('Invalid user!', { cause: "404" }));

  // Check if the user is confirmed
  // if (!user.isConfirmed) return next(new AppError('You are not confirmed!', { cause: "404" }));
  // if (!password || !user.password) 
    // return   new Error('Missing password or user.password');
  // Check the password
  const validPassword = bcrypt.compareSync(password, user.password, process.env.SALT_ROUND)
  if (!validPassword) 
    return  next (new  AppError(  "Invalid password" ,{cause :"404"}))
    // Generate token
  const token = jwt.sign({ email, id: user._id }, process.env.TOKEN_SECRET);

  // Save token in Token model
  await Tokenmodel.create({ token, user: user._id });

  // Send response
  return res.json({ success: true, message: "Successful login", token });
});

const  forGetPass=  catchError(async(req,res,next)=>{
  //dat  
  const {email}=req.body
  const user = await User.findOne({email})
  if(!user)return next(new AppError('Invalid  user! ',  {cause:"404"}))
    //  generateCode 
    const  forgetCode= randomizing.generate({
      charset:"numeric",
      length:5,
    })
    // save  code
    user.forgetCode =forgetCode
     await  user.save();
    //  send  code  
      const sendForgetCode= await sendMassa({to:email,
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
   user.password =   bcrypt.hashSync(password ,process.env.SALT_ROUND)
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
    // activateAccount,
    logan ,
    forGetPass,
    resetPass
    
  
}