import   mongoose, { Types } from"mongoose"

const tokenSchema=new mongoose.Schema({
    token:{type: String ,  required:true },
    user:{type:Types.ObjectId, ref:"User"},
    isValid:{type: Boolean ,default : true},
    agent:{type: String},
    expiredAt:{type: String}
},{timestamps:true})

export  const    Tokenmodel=mongoose.model('tokenSchema',tokenSchema)
