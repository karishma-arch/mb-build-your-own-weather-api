import { Router } from "express";
import {
  register,
  login,
  getme,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
  editUser,
  createLocation,
  getlocation,
  deleteLocations,
  getWeather,
  getForecast,
  getHourlyForecast
} from "../controllers/users.controllers.js";
import auth from "../middleware/user.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getme", auth, getme);
router.post("/logout", auth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);
router.put("/editUser/:id", auth, editUser);
router.post("/locations", auth, createLocation);
router.get("/getlocation", auth, getlocation);
router.delete("/locations/:id", auth, deleteLocations);
router.get("/locations/:id/weather", auth, getWeather);
router.get("/locations/:id/forecast",auth,getForecast);
router.get("/location/:id/forecast",auth,getHourlyForecast)
export default router;
