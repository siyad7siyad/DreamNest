import express from "express"
import { signup } from "../../../adapters/controllers/authController.js"

const router = express.Router()

router.post("/signup",signup)

export default router