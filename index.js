const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRouter=require("./controllers/userRouter")
const packageRouter=require("./controllers/packageRouter")
const adminRouter=require("./controllers/admin_packageRouter")
const studentRouter = require("./controllers/studentRouter")
const blogRouter = require("./controllers/blogRouter")
const admin_studentRouter = require("./controllers/admin_studentRouter")

const app = express()


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://aravind336:aravind336@cluster0.hsvdpyv.mongodb.net/testDB?retryWrites=true&w=majority",
{useNewUrlParser:true})

app.use("/User",userRouter)
app.use("/Package",packageRouter)
app.use("/AdminPackage",adminRouter)
app.use("/Student",studentRouter)
app.use("/blog",blogRouter)
app.use("/AdminStudent",admin_studentRouter)

app.listen(5000, () => { console.log("server started") })