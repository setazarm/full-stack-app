import ImageCollection from "../models/imageSchema.js"
import UserCollection from "../models/UserSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const getAllUsers =async (req,res)=>{
    try{
        const Users =await UserCollection.find()
        res.json({success:true, data:Users})
    }
    catch(err){
        res.json({success:false, message:err.message})

    }

}

export const addNewUser=async(req,res)=>{
    try{
        //const user =userCollection.create(req.body)
        const user= new UserCollection(req.body)
      
        if(req.files){
            const image= new ImageCollection({
                filename: new Date().getTime()+"-"+req.files.image.name ,   // add time at the begining of name to make it unique
                data: req.files.image.data,
                userId:user._id
            })
            await image.save()
            user.profileImage=`http://localhost:4000/images/${image.filename}`
        }
       // hashing user password before adding user to DB. can be done in Schema as well
       const hashedPassword= bcrypt.hashSync(user.password, 10)
       user.password=hashedPassword

        //storing user into database
        await user.save()
        res.json({success:true, data:user})
    }catch(err){
        res.json({success:false, message:err.message})
    }

}
export const getSingleUser=async(req,res)=>{
    try{
        const {id}=req.params
        const user= await UserCollection.findById(id)
        // const user= awaitUserCollection.findOne({_id:id}) - pass query as object
        if(user){
            res.json({success:true, data:user})
        }else{
            res.json({success:false, message:"please provide a valid id"})
        }
    }catch(err){
        res.json({success:false, message:err.message})

    }

}
export const updateUser=async(req,res)=>{
    try{
        const{id}=req.params
        const updatedUser= await UserCollection.findByIdAndUpdate(id,req.body,{new:true})
        res.json({success:true,data:updatedUser})
    }catch(err){
        res.json({success:false, message:err.message})

    }

}
export const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedUser=await UserCollection.findByIdAndRemove(id)
        res.json({success:true,data:deletedUser})
    }catch(err){
        res.json({success:false, message:err.message})

    }

}
//authentication process. issuing a (token) certificate to user
 export const loginUser=async (req,res)=>{
   try{
    const{email,password}=req.body;
    const user=await UserCollection.findOne({email})
    if(user){
        //verify password
        const verifyPassword=bcrypt.compareSync(password, user.password)// returns boolean
        if(verifyPassword){
            //JWT create unique token
            const token=jwt.sign({_id:user._id,email:user.email},process.env.SIGNATURE,{expiresIn:"1h",issuer:"setare",audience:"e-store-users"} )//first argument should be part of the user data, second argument should be signature.the last argument is optional
                 res.header("token",token).json({success:true,data:user}) //sending data in header of response 
        }else{
         res.json({success:false, message:"password dosen't match"})
        }
    }else{
        res.json({success:false, message:"email dosen't exist"})
    }
   }catch(err){
    res.json({success:false, message:err.message})

}
 }