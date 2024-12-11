import {Task} from '../Models/Task.js';
import  {catchAsyncError} from '../Middlewares/catchAsyncError.js'
import ErrorHandler from '../Utils/ErrorHandler.js'


export const getAllTask = catchAsyncError(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const tasks = await Task.find()
        .skip(skip)               
        .limit(limit)             
        .sort({ createdAt: 1 });  

    const totalTasks = await Task.countDocuments();

    const totalPages = Math.ceil(totalTasks / limit);

    if (page > totalPages) {
        return res.status(200).json({
            success: true,
            page,
            totalTasks,
            totalPages,
            tasks: [],
        });
    }

    res.status(200).json({
        success: true,
        page,
        totalTasks,
        totalPages,
        tasks,
    });
});



export const createTask=catchAsyncError(async(req,res,next)=>{

    const {title,description,completed,createdAt} = req.body
    if(!title) return next(new ErrorHandler("Title is required",400))
    
     await Task.create({
        title,
        description,
        completed,
        createdAt,
        
    
        }) 
        res.status(201).json({
            success:true,
            message:"Task is  created successfully. ",
            

     })

    })

    export const getTask=catchAsyncError(async(req,res,next)=>{
const id = req.params.id;
        const task= await Task.findById(id)
        if(!task) return next(new ErrorHandler("Task not found",404))
        res.status(200).json({
            success:true,
            task,
        })
    
    }) 
   
    export const updateTask = catchAsyncError(async(req, res, next) => {
        const { title, description, completed, createdAt } = req.body;
        
        if (!title) return next(new ErrorHandler("Title is required", 400));
    
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,               
            {                             
                title,
                description,
                completed,
                createdAt,
            },
            { new: true, runValidators: true }  
        );
    
        if (!updatedTask) return next(new ErrorHandler("Task not found", 404));
    
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    });
    export const updateTaskField = catchAsyncError(async (req, res, next) => {
        const { field, value } = req.body;  
        
        if (!field || value === undefined) {
            return next(new ErrorHandler("Field and value are required", 400));
        }
    
        const validFields = ['title', 'description', 'completed', 'createdAt']; 
        if (!validFields.includes(field)) {
            return next(new ErrorHandler("Invalid field", 400));
        }
    
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,               
            { [field]: value },          
            { new: true, runValidators: true } 
        );
    
        if (!updatedTask) {
            return next(new ErrorHandler("Task not found", 404));
        }
    
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    });
    

    export const deleteTask=catchAsyncError(async(req,res,next)=>{
        const id = req.params.id;
                const task= await Task.findByIdAndDelete(id)
                if(!task) return next(new ErrorHandler("Task not found",404))
                res.status(200).json({
                    success:true,
                    message:"Task deleted successfully"
                })
            
            }) 
    

