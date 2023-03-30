import {Schema, model} from "mongoose"
const imageSchema=new Schema({
    filename:{type:String, required:true},
    data:{type:Buffer, required:true}, //image file
    userId:{type:Schema.Types.ObjectId, ref:"users"}  // with this line only The user can see the profile image
})
const ImageCollection= model("images",imageSchema)
export default ImageCollection