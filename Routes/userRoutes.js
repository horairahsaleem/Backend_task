import express from "express";
const router = express.Router();
import { Login, register } from "../Controllers/userController.js";

router.route('/register').post(register)
router.route('/login').post(Login)



export default router