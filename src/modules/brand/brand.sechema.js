import Joi  from   'joi';
import { isValidObjectId } from '../../middilware/validation.middilware.js';


const  createBrand = Joi.object({
    name:Joi.string().min(3).max(50).required(),
    catagories: Joi.array().items(Joi.string().custom(isValidObjectId)).required(),
})
const  updateBrand = Joi.object({
    name:Joi.string().min(3).max(50).required(),
    id:Joi.string().custom(isValidObjectId).required(),
})
const  deltaBrand = Joi.object({
    id:Joi.string().custom(isValidObjectId).required(),
})
















export{
    createBrand,
    updateBrand,
    deltaBrand
}