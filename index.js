const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const LoginRouter = require("./controllers/LoginRoute")
const SignupRouter = require("./controllers/SignupRoute")


const app = express()


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://aravind336:aravind336@cluster0.hsvdpyv.mongodb.net/testDB?retryWrites=true&w=majority",
{useNewUrlParser:true})

app.use("/api/User",LoginRouter)
app.use("/api/User",SignupRouter)


app.listen(5000, () => { console.log("server started") })