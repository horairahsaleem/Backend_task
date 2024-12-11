import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"


const schema= new mongoose.Schema({ 
    //     Name type, required
name:{
    type:String,
    required:[true,"Please Enter the name"]
},
// Email type, required, unique, validate
email:{
    type:String,
    required:[true,"Please enter the email"],
    unique:true,
    validator:validator.isEmail,

},
password:{
    type:String,
    required:[true,"Please enter the password"],
    miniLength:[8,"Please enter 8 digit or longer Password"],
    select:false,
}

});

schema.pre("save",async function(next){
if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
next()
})

schema.methods.getJWTToken=function(){
        return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
            expiresIn:"15d",
        })}
   
        schema.methods.comparePassword = async function(password) {
            if (!password || !this.password) {
                throw new Error('data and hash arguments required');
            }
            
            return await bcrypt.compare(password, this.password);
        };
        




export const User = mongoose.model('Users',schema);