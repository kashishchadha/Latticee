import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const  registerUser=async (req,res)=>{
    const {username,displayname,email,password}=req.body
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
     const token=jwt.sign({userId:user._id},process.env.JWT_SCERET)
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.Node_ENV==="production",
        maxAge:30*24*60*60*1000,
    })
    const {hashPassword,...otherdetails}=user.toObject();
    res.status(201).json(otherdetails);
}


export const  loginUser=async (req,res)=>{
    const {email,password}=req.body
    if(!password || !email){
        res.status(400).json({message:"All fields are required!"})
    }
 const user=await User.findOne({email});
if(!user){
     return  res.status(400).json({message:"Invalid email or password !"})
    }

    const isPasswordCorrect=await bcrypt.compare(password,user.hashPassword);
    if(!isPasswordCorrect){
           return  res.status(400).json({message:"Invalid email or password !"})
   
    }
    const token=jwt.sign({userid:user._id},process.env.JWT_SCERET)
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.Node_ENV==="production",
        maxAge:30*24*60*60*1000,
    })
    const {hashPassword,...otherdetails}=user.toObject();
    res.status(200).json(otherdetails);
}

export const  logoutUser=async (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({message:"Logout Successful"})
}

export const getUser = async (req, res) => {
    const { username } = req.params;
    const person = await User.findOne({ username });
    if (!person) {
        return res.status(404).json({ message: "User not found" });
    }
    const { hashPassword, ...otherDetails } = person.toObject();
    res.status(200).json(otherDetails);
}

