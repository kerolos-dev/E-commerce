import { Types } from "mongoose"
import { AppError } from "../utils/appError.js"
export const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate({...req.params,...req.body,...req.query}, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errMsg = []
            error.details.forEach((val)=>{
                errMsg.push(val.message)
            })
            next(new AppError(errMsg))
            res.json(errMsg)
        }
    }
}



 const  isValidObjectId= (value , helper)=>{
   if(Types.ObjectId.isValid(value))   return  true 
    return helper.message("id  is not aValid ")
}  


export{
    isValidObjectId
}