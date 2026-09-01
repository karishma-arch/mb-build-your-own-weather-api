import { Router } from "express";
import { register, 
    login, getme ,
    logout,forgotPassword,
    verifyOtp,resetPassword,
editUser,createLocation} from "../controllers/users.controllers.js";
import auth from "../middleware/user.js";

const router = Router();

//router.post("/login",login)

router.post("/register", register);
router.post("/login", login);
router.get("/getme",auth,getme)
router.post("/logout",auth,logout)
router.post("/forgot-password",forgotPassword)
router.post("/verifyOtp",verifyOtp)
router.post("/resetPassword",resetPassword)
router.put("/editUser/:id",auth,editUser)
router.post("/api/locations",auth,createLocation)
export default router;
