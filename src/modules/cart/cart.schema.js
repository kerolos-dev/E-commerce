import Joi  from   'joi';
import { isValidObjectId } from '../../middleware/validation.middleware.js';


const  addToCart  = Joi.object({   
    productId : Joi.string().custom(isValidObjectId).required(),
    quantity : Joi.number().integer().min(1)
}).required()

const  getCart= Joi.object({
    cartId :  Joi.string().custom(isValidObjectId)
})








export{
    addToCart,
    getCart
}