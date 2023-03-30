import {Router} from "express"
import { addNewProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productsController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"
const router=Router()
router.get("/",getAllProducts)
router.get("/:id",getSingleProduct)
router.post("/",auth,isAdmin,addNewProduct)
router.patch("/:id",auth,isAdmin,updateProduct)
router.delete("/:id",auth,isAdmin,deleteProduct)
export default router