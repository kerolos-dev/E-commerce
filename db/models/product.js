import mongoose, { Schema, Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, min: 2, max: 20 },
    slug: { type: String, required: true, unique: true },
    description: { type: String, min: 10, max: 100 },
    image: { id: { type: String }, url: { type: String } },
    availableItems: { type: Number, min: 1, max: 10 },
    soldItems: { type: Number, default: 0 },
    price: { type: Number, min: 1 },
    discount: { type: Number, min: 1, max: 75 },
    createdBy: { type: Types.ObjectId, ref: "admin" },
    category: { type: Types.ObjectId, ref: "Category" },
    subCategory: { type: Types.ObjectId, ref: "subCategory" },
    brand: { type: Types.ObjectId, ref: "Brand" },
    cloudFolder:{  type:  String  ,  unique :true ,  required :  true }
  },
  { timestamps: true,  
    strictQuery: true, 
    toJSON:{victuals:  true },
    toObject:{victuals:  true}

   }
);

//  victuals 
productSchema.virtual("finalPrice").get(function(){
  //this  >>    document    ....  return >>  final  price  
  //final  price  
  return  Number.parseInt(
    this.price -  (this.price *   this.discount || 0 ) /100
  ).toFixed(2)
})



//  query  halper 
productSchema.query.paginate =  function(page) {
    //  pagination
    page=  page < 1 ||   isNaN(page) ||  !page ? 1  : page   ; 
    const limit = 1;
    const skip = limit * (page - 1);
    productModel.find().skip(skip).limit(limit);


    return  this.skip(skip).limit(limit)
    



}



productSchema.query.search =  function(keyword){
  // this >>  query 
  if (keyword) {
    return this.find({
      $or:[
        {name :{$regex: keyword , $options:"i"}},
        {description :{$regex: keyword , $options:"i"}}
       ],
    }
    );
  }
}

//  methods
productSchema.methods.inStoct =  function(requiredQuantity){
  //  this  >>  document  >>  product  
  return  this.availableItems >=  requiredQuantity  ?  true :  false  ;
}



const productModel = mongoose.model("Product", productSchema);

export { productModel };
