import {Router} from "express"
import {getAllOrders,getSingleOrder,addNewOrder,updateOrder,deleteOrder,getAllUsersOrders, openStripeCheckoutPage} from "../controllers/ordersController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"
const router=Router()
router.get("/",auth,isAdmin,getAllOrders)
router.post("/",auth,openStripeCheckoutPage)
router.post("/confirm",auth,addNewOrder)
router.get("/userorders/:id",auth,isAdmin,getAllUsersOrders)
router.get("/:id",auth,isAdmin,getSingleOrder)
router.patch("/:id",auth,isAdmin,updateOrder)
router.delete("/:id",auth,isAdmin,deleteOrder)
export default router