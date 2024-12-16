import   mongoose, { Types }  from "mongoose";
 import  bcrypt  from "bcrypt"

const  userSchema=new   mongoose.Schema({
    name:{
        type:String ,
        min: [3,  "to  short  name"],
        max:[50 ,"to  long  name "],
    },
    email:{
        type:String ,
        unique:true,
        required:true,
        lowercase:true,
        trim: true,
    },
    password:{
        type:String ,
        min: [3,  "to  short  name"],
        max:[50 ,"to  long  name "],
    },
    note:{
        type:Types.ObjectId , 
         rfe :"notemodel" ,
    },
    gender:{
        type:String ,
        enum:["male",  "female"]
    },
    phone:{
        type:String ,
        required:true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user",
        required: true
      },
    forgetCode: {
        type:String,
        default: true,
      },  
    profileImmage:{
        url:{
            type:String ,
            default:"https://res.cloudinary.com/dhpjskoxq/image/upload/v1713276551/ecommers/users/defaults/protfilePic/default-profile-account-unknown-icon-black-silhouette-free-vector_h04ny3.jpg"
        },
        id:{type:String ,default:"/ecommers/users/defaults/protfilePic/default-profile-account-unknown-icon-black-silhouette-free-vector_h04ny3"}
    },
  isConfirmed:{
    type:Boolean , 
     default:false },
    coverImage:[
        {url: { type:String},
        id:{type:String }}
    ],


},{
        //  this is for opptine   _vt and  createdAt and  apdateAT 
        timestamps: true 
})


// Pre-save hook to hash the password before saving
userSchema.pre('save',  async function (next) {
    // Only hash the password if it has been modified or is new
    if (this.isModified('password')){
        this.password  = bcrypt.hashSync (this.password ,parseInt(process.env.SALT_ROUND))
    }
});


  export  const   User=mongoose.model("User",userSchema)


