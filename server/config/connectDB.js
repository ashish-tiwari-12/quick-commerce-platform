import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.mongodb_url){
    throw new Error("Mongodb url is not defined"    )
}
async function connectDB(){
    try{
        await mongoose.connect(process.env.mongodb_url)
        console.log("connected successfully")
    }catch(error){
        console.log("mongodb connection failed")
        console.log(error)
        process.exit(1) 
    }
}
export default connectDB;