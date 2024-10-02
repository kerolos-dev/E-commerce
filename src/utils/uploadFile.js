import multer , {diskStorage}from "multer";
import { AppError } from "./appError.js";
// import { nanoid } from "nanoid/non-secure";


export const fileUpload =(fieldName)=>{
  // const storage = multer.diskStorage({
  //     destination:  (req, file, cb)=> {
  //       cb(null,  'uploads/'  )
  //     },
  //     filename:  (req, file, cb)=> {
  //       cb(null,nanoid()+"-"+ file.originalname)
  //     }
  //   }) 
  
    const fileFilter = (req, file, cb) =>{
      //   check  mimetype    image 
      if(!['image/png' ,'image/jpeg'].includes(file.mimetype) )
      return  cb(new AppError('Invalid  format'),false)
      return  cb(null ,  true )
    }
    // const upload = multer({ storage  ,fileFilter  })
    //   return upload

    return  multer({storage :  diskStorage({}),  fileFilter })
}
