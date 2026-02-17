import express from "express"
import { createPassword, deletPassword, getPassword, updatePassword } from "../controllers/passwordController.js"


const router = express.Router();

router.post("/", createPassword)

router.get("/", getPassword)

router.put("/:id",updatePassword )
router.delete("/:id", deletPassword)

export default router;
