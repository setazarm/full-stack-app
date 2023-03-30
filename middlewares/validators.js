import {body, validationResult} from "express-validator"

export const rules= [body("email").isEmail().withMessage("please provide us with valid email").
normalizeEmail(),
body("password").isString().withMessage("password should be string")
.isLength({min:4}).withMessage("password is too short") ,

//this custom middleware use validationResult to handle errors and close RRC
(req,res,next)=>{
const errors= validationResult(req)
if(errors.isEmpty()){
    next()
}else{
    res.json({success:false, message:errors.array().map(err=>({[err.param]:err.msg}))})
}
}]