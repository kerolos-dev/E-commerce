import multer , {diskStorage}from "multer";
import { AppError } from "./appError.js";
import { nanoid } from "nanoid/non-secure";


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
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const extname = file.originalname.split('.').pop();
    if (!allowedExtensions.includes(extname)) {
      return cb(new Error('Only images (.jpg, .jpeg, .png) are allowed'));
    }
    cb(null, true);
    }
    // const upload = multer({ storage  ,fileFilter  })
    //   return upload

    return  multer({storage :  diskStorage({}),  fileFilter })
}




// import multer from  'multer'
// import { AppError } from './appError';

// export  const fileUpload = multer({
//   limits: {fileSize: 1000000}, // Set a limit (in bytes) for image size
//   fileFilter: (req, file, cb) => {
//     const allowedExtensions = ['jpg', 'jpeg', 'png'];
//     const extname = file.originalname.split('.').pop();
//     if (!allowedExtensions.includes(extname)) {
//       return cb(new Error('Only images (.jpg, .jpeg, .png) are allowed'));
//     }
//     cb(null, true);
//   }
// });

// const createproduct = catchError(async (req, res, next) => {
//   // ... your existing code ...

//   fileUpload.single('file')(req, res, (err) => {
//     if (err) {
//       return next(new AppError(err.message));
//     }
//     // Continue with image processing and saving product
//   });
// });