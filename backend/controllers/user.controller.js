import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
export const  registerUser=async (req,res)=>{
    const {username,displayname,email,password}=req.body
    console.log(username,displayname,email,password);
    if(!username || !password || !email){
        res.status(400).json({message:"All fields are required!"})
    }
    const newhashPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        displayname,
        username,
        email,
        hashPassword:newhashPassword
    });
    const {hashPassword,...otherdetails}=user.toObject();
    res.status(201).json(otherdetails);
}

export const getUser= async (req,res)=>{
    const {username}=req.params;
 const person=await User.findOne({username});
 const {hashPassword,...otherDetails}=person.toObject();
 res.status(200).json(otherDetails);
}

export const  loginUser=async (req,res)=>{
}
export const  logoutUser=async (req,res)=>{
}