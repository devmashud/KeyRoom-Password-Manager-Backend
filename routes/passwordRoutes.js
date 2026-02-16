import express from "express"
import { createPassword, getPassword, updatePassword } from "../controllers/passwordController.js"


const router = express.Router();

router.post("/", createPassword)

router.get("/", getPassword)

router.put("/:id",updatePassword )

export default router;
