import Joi  from   'joi';
import { isValidObjectId } from '../../middilware/validation.middilware.js';

const  createCategory=Joi.object({
    name: Joi.string().required().max(20).min(5),
  
   })
const  upDatecategory=Joi.object({
    name: Joi.string().max(20).min(5).required(),
    id: Joi.string().custom(isValidObjectId).required(),

   })
   const  deletecategory=Joi.object({
    id: Joi.string().custom(isValidObjectId).required(),
  
   })
   
export{
    createCategory,
    upDatecategory,
    deletecategory
}