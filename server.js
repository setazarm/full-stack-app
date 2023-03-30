import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productsRoute from "./routes/productsRoute.js"
import usersRoute from "./routes/usersRoute.js"
import ordersRoute from "./routes/ordersRoute.js"
import fileupload from "express-fileupload"
import ImageCollection from "./models/imageSchema.js"
// import cors from "cors"
import stream from "stream"
dotenv.config()
import Stripe from "stripe"
export const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
const app= express();
const PORT=process.env.PORT || 4000

// app.use(cors({origin:"http://localhost:5173",exposedHeaders:["token"]}))
//to be able to receive every kind of data
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//handling form data we can use multer or express-fileupload
app.use(fileupload())
app.use(express.static("views/dist"))
//create index route
// app.get("/",(req,res)=>{
//     res.sendFile("./views/dist/index.html",{root:"."})
// })
mongoose.connect(process.env.URI)
.then(()=>{console.log("connection to DB established")})
.catch(err=>console.log(err.message))

//use handle any requests
app.use("/products",productsRoute)
app.use("/users",usersRoute)
app.use("/orders",ordersRoute)
app.get("/images/:filename", async(req,res)=>{
    const image= await ImageCollection.findOne({filename:req.params.filename})
    const readStream=stream.Readable.from(image.data)
    readStream.pipe(res)  //transfer image to the response
})

app.listen(PORT,()=>{console.log(`server is running on port: ${PORT}`)})