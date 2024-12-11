import mongoose from "mongoose";



const schema= new mongoose.Schema({ 

title:{
    type:String,
    required:[true,"Please Enter task name"]
},
description:{
    type:String,
    default: "", // Not asked in the tasked but to control undefined behavior

   
},
completed: {
    type: Boolean, 
    default: false, 
},
createdAt: {
    type: Date,
    default: Date.now, 
  },

});




export const Task = mongoose.model('Task',schema);