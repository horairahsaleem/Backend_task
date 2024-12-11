import express from "express";
const router = express.Router();
import { createTask, deleteTask, getAllTask, getTask, updateTask, updateTaskField } from "../Controllers/taskController.js";
import { isAuthenticated } from "../Middlewares/Authentication.js";
 

router.route('/getalltask').get(getAllTask)
router.route('/create').post(isAuthenticated,createTask)
router.route('/gettask/:id').get(isAuthenticated,getTask)
router.route('/updatetask/:id').put(isAuthenticated,updateTask)
router.route('/updatetaskfeild/:id').patch(isAuthenticated,updateTaskField)
router.route('/delete/:id').delete(isAuthenticated,deleteTask)



export default router