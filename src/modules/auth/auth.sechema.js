import Joi  from   'joi';

// 
const  register= Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confrimPassword:Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().required(),
    gender: Joi.string().required(),

}).required()
// 
const activateAccoun= Joi.object({
    token:Joi.string().required()

}).required()
// 
const  login= Joi.object({ 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

}).required()
// forgoyPass
const  forgoyPass=Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

})

const resetPassowrd=Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    forgetCode: Joi.string().length(5).required(),
    password:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confrimPassword:Joi.string().valid(Joi.ref("password")).required(),

}).required()
export{
    register,
    activateAccoun,
    login,
    forgoyPass,
    resetPassowrd
}