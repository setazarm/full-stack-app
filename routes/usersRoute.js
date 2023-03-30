import {Router} from "express"
import { rules } from "../middlewares/validators.js"

import {getAllUsers,getSingleUser,addNewUser,updateUser,deleteUser,loginUser} from "../controllers/usersController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/isAdmin.js"
const router=Router()
router.get("/",auth,isAdmin,getAllUsers)


router.post("/",rules,addNewUser)
router.post("/login", loginUser)
router.get("/refreshpage", auth, (req,res)=>{
    res.json({success:true, data:req.user})
})
router.get("/:id",auth, isAdmin, getSingleUser )


router.patch("/:id",auth,updateUser)
router.delete("/:id",auth,deleteUser)
export default router