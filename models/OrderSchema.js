import{model, Schema} from "mongoose"
const orderSchema= new Schema({
    userId:{type:Schema.Types.ObjectId, ref:"users", required:true},
    total:{type:Number,required:true},
    products:[{type:Schema.Types.ObjectId,ref:"products"}]

},{timestamps:true}   //automatically add createdAt and updatedAt 
)




const OrderCollection=model("orders",orderSchema)
export default OrderCollection