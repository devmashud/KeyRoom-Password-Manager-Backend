import express from "express"
import { createPassword, getPassword } from "../controllers/passwordController.js"


const router = express.Router();

router.post("/", createPassword)

router.get("/", getPassword)

export default router;
