import OrderCollection from "../models/OrderSchema.js"
import orderCollection from "../models/OrderSchema.js"
import ProductCollection from "../models/productSchema.js"
import {stripe} from "../server.js"


export const getAllOrders =async (req,res)=>{
    try{
        const orders =await orderCollection.find().populate("userId", "-profileImage -password").populate("products", "title price")
        res.json({success:true, data:orders})
    }
    catch(err){
        res.json({success:false, message:err.message})

    }

}

export const openStripeCheckoutPage=async(req,res)=>{

    try{
        const data = []
        for(const id of req.body.products){
            data.push(await ProductCollection.findById(id))
        }
         
    
    const line_items = data.map(product=>{
        return ( {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data:{
                currency:"usd",
                product_data:{
                    name:product.title,
                    images: [product.thumbnail],
                    description: product.description
                },
                unit_amount:product.price*100
            },
            quantity:1
          })
    }) 
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `https://e-store-fullstack-app-setare.onrender.com/#/cart?success=true`, 
        cancel_url: `https://e-store-fullstack-app-setare.onrender.com/#/cart?success=false`, 
      });
    
      res.json({success:true, url: session.url} );



    /* const order = OrderCollection.create(req.body) */
   /*  const order = new OrderCollection(req.body)
    await order.save() 
    res.json({success:true, data:order}) */
}
catch(err){
    res.json({success:false, message: err.message })
}

}
export const addNewOrder = async (req, res, next) => {
    try {
      const order = new OrderCollection(req.body);
      await order.save();
      res.json({ success: true, data: order });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  };
export const getSingleOrder=async(req,res)=>{
    try{
        const {id}=req.params
        const order= await orderCollection.findById(id)
        // const order= await orderCollection.findOne({_id:id}) - pass query as object
        if(order){
            res.json({success:true, data:order})
        }else{
            res.json({success:false, message:"please provide a valid id"})
        }
    }catch(err){
        res.json({success:false, message:err.message})

    }

}
export const updateOrder=async(req,res)=>{
    try{
        const{id}=req.params
        const updatedOrder= await orderCollection.findByIdAndUpdate(id,req.body,{new:true})
        res.json({success:true,data:updatedOrder})
    }catch(err){
        res.json({success:false, message:err.message})

    }

}
export const deleteOrder=async(req,res)=>{
    try{
        const {id}=req.params
        const deletedOrder=await orderCollection.findByIdAndRemove(id)
        res.json({success:true,data:deletedOrder})
    }catch(err){
        res.json({success:false, message:err.message})

    }

}

export const getAllUsersOrders=async(req,res,next)=>{
    try{
        const{id}=req.params
         const userOrders=await OrderCollection.find({userId:id}).populate("products")
         res.json({success:true,data:userOrders})

    }catch(err){
        res.json({success:false, message:err.message})

    }
}
