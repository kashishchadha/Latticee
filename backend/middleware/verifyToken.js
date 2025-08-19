import Jwt from "jsonwebtoken"
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({message:"not authenticated"});
    Jwt.verify(token,process.env.JWT_SCERET, async (err,payload)=>{
        if(err){
            return res.status(403).json({message:"token is invalid"});
        }
        req.userid=payload.userid;
        next();
    })
}