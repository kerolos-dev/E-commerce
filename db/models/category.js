import  mongoose,{Types} from "mongoose"

const  categorySchema=new  mongoose.Schema({
    name:{type: String , required:true  ,  unique :  true ,  min:5 ,  max: 20 },
    slug:{type: String  ,  required :  true , unique :  true  } ,  
    createdBy:{type:Types.ObjectId, ref:"User" ,},
    image:{ id :{type: String} ,  url:{type :String}},
    brand:{type:Types.ObjectId, ref:"Brand",required :true }
},{
    //  this is for pontine   _vt and  createdAt and  updateAT 
    timestamps: true 
})
 



const  CategoryModel=mongoose.model('category',categorySchema)

export{
    CategoryModel
}

