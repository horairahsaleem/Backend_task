import app from "./app.js"
import { connectDB } from "./Config/dataBase.js";

connectDB()




app.listen(process.env.PORT,()=>{
    console.log(`Server is Wroking on Port ${process.env.PORT}`)

})

