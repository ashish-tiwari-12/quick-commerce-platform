import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        unique:true,
    },
    avatar:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
        default:null
    },
    refresh_token:{
        type:String,
        default:""
    },
    varify_email:{
        type:Boolean,
        default:false
    },
    last_loing_date:{
        type:Date,
        default:null
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details:{
        type:mongoose.Schema.ObjectId,
        ref:"address",
    },
    shopping_cart:{
        type:mongoose.Schema.ObjectId,
        ref:"cartProduct"
    },
    orderHistory:{
        type:mongoose.Schema.ObjectId,
        ref:"Order"
    },
    forgot_password_otp:{
        type:String,
        default:null
    },
    forgot_password_expire:{
        type:Date,
        default:null
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},
    {timestamps: true} 

)
const UserModel = mongoose.model("User",userSchema)
export default UserModel;