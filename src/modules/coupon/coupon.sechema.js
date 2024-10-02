import  Joi  from"joi"


const  create=  Joi.object({
    discount : Joi.number()
    .integer()
    .min(1)
    .max(100)
    .required(),// integer  :  Whole number without fractions // .integer().options({createCoupon:  false})
    expiredAt:  Joi.date().greater(Date.now()).required(), //  check  expirer date  for  coupon

})



export{
    create
}