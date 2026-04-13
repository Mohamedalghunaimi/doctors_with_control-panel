const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const { authRouter } = require("./routes/auth.route");
const { adminRouter } = require("./routes/admin.route");
const { doctorRouter } = require("./routes/doctor.route");
const { appointmentRouter } = require("./routes/appointment.route");
require("dotenv").config();
const app = express();
app.use(require("cors")({
    origin:["http://localhost:5173","http://localhost:3000"],
    credentials:true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser(
    {
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        path:"/",
        maxAge:1000*60*60*24
    }
))
app.get("/",(req,res)=> {
    res.send("welcom to our website")
})
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/doctor",doctorRouter)
app.use("/api/appointment",appointmentRouter)
app.listen(process.env.PORT||5000,()=> {
    console.log(`welcom from port ${process.env.PORT}`)
})