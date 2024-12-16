import Joi  from  "joi";

const create = Joi.object({
    discount: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required(),
    expiredAt: Joi.date().greater(Date.now()).optional(),
  }).required();

const  update=Joi.object({
  discount: Joi.number().integer().min(1).max(100),
  expiredAt: Joi.date().greater(Date.now()).optional(),
  code:Joi.string().length(5).required()
  
}).required();




const  deleteCoupon=Joi.object({
  code:Joi.string().length(5).required()
  
}).required();

  export{
    create,
    update,
    deleteCoupon,

  }