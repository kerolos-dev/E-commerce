import mongoose, { model, Types } from "mongoose";

const  brandSchema=new  mongoose.Schema({
    name:{
        type:String ,  
         min: [3,  "to  short  name"],
         max:[50 ,"to  long  name "],
    },
    image:{
           id :{type: String} ,
            url:{type :String}
    },
    slug:{
        type:String ,  
        required:true,
        unique:true,

    },
    createBy:{
        type:Types.ObjectId,
        ref:'User',
    }, 
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }]

    
},
{
    timestamps:true
}


)




export  const   brandModel=  model("Brand" ,brandSchema)