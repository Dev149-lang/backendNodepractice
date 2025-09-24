import express from "express"
import { login, registerUser, verifyuser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyuser);
router.post("/verify/:token", login);

export default router;     