import {User} from '../Models/User.js'
import  {catchAsyncError} from '../Middlewares/catchAsyncError.js'
import ErrorHandler from '../Utils/ErrorHandler.js'
import { sendToken } from '../Utils/sendToken.js'




// Registration route
// That is  not demanded in the task so i can make static 
// user in database and the implement the the login functionality
//  but i have tried to use best practices

export const register =catchAsyncError(async(req,res,next)=>{
    const{name,email,password,} =req.body

    

    if(!name||!email||!password)
        return next(new ErrorHandler('Please add all fields ',400))
    let user = await User.findOne({email})
    if(user)
     return next(new ErrorHandler("User already exists",409))

 user = await User.create({
    name,
    email,
    password,
  
})
res.status(201).json({
    success:true,
    message:'Registered Successfully'
})
})

// Login route
export const Login= catchAsyncError(async(req,res,next)=>{
    const {password,email}= req.body
        if(!email||!password)
        return next(new ErrorHandler('Please add all fields ',400))

    const user = await User.findOne({email}).select("+password")

    if(!user) return next(new ErrorHandler("Incorrect email or password",401))

const isMatch = await user.comparePassword(password);


if(!isMatch)
return next(new ErrorHandler("Incorrect email or password",401))

sendToken(res,user,`Welcome Back${user.name}`,201)
 

})
