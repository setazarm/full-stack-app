import jwt from "jsonwebtoken"
import UserCollection from "../models/UserSchema.js"
export const auth= async(req,res,next)=>{
    try{
        const token=req.headers.token
        //verify this token
       const payload= jwt.verify(token,process.env.SIGNATURE) //returns payload
        const user=await UserCollection.findById(payload._id)
        req.user=user  //attaching user in request object
        next()
    
    }catch(err){
        res.json({success:false,message:err.message})
    }
   
}
