import Joi  from   'joi';
import { isValidObjectId } from '../../middilware/validation.middilware.js';



const    createSubcategory=Joi.object({
name :Joi.string().required().max(30).min(5),
category :Joi.string().custom(isValidObjectId).required(),
})


const    updateSubcategory=Joi.object({
    name :Joi.string().required().max(30).min(5),
    id:Joi.string().custom(isValidObjectId).required(),
    category :Joi.string().custom(isValidObjectId).required(),
})



const    deleteSubcategory=Joi.object({
    name :Joi.string().required().max(30).min(5),
    id:Joi.string().custom(isValidObjectId).required(),
    category :Joi.string().custom(isValidObjectId).required(),
})


const    getSubcategory=Joi.object({
    category :Joi.string().custom(isValidObjectId).required(),
})


export{
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategory



}