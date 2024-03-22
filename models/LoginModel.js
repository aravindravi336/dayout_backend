const mongoose = require("mongoose")
const testSchema = new mongoose.Schema(
    {
        userName:String,
        passWord:String,
   
    }
)


module.exports=mongoose.model("login",testSchema)