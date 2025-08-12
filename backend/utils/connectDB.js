import mongoose from "mongoose";
const connectDB= async ()=>{
    try{

await mongoose.connect(process.env.MONGO_URL);
console.log("mongo connected");

    }catch(error){
        console.log("Mongo error",error);
    }
}
export default connectDB;

