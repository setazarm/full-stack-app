import {Schema, model} from "mongoose"

const userSchema= new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:function(){
          return  `https://robohash/${this.firstName}`

        }
    },
    role:{
        type:String,
        default:"user",
        enum:["user",/*"admin"*/,"manager","supervisor"]   // when we create the admin and add it to collection we should remove admin from role in schema. otherwise other user can select it
    },
    orders:{
        type:Schema.Types.ObjectId,
        ref:"orders"
    }
})
//set email as and index
userSchema.indexes({email:1})
const UserCollection=model("users",userSchema)
export default UserCollection;