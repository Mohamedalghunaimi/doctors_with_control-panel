const { Doctor } = require("../models/Doctor");
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
const { Appointment } = require("../models/appointment");
const { main } = require("../models/user");
require("dotenv").config()
const doctorLogin = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.json({
            success:false,
            message:"missing details!"
        })
    }
    try {
        await main()
        const doctor = await Doctor.findOne({email})
        if(!doctor) {
            return res.json({
                success:false,
                message:"invalid inputs"
            })
        }
        const isMatch = await bcrypt.compare(password,doctor.password)
        if(!isMatch) {
            return res.json({
                success:true,
                message:"invalid inputs"
            })
        }
        const doctorToken = await jwt.sign({email},process.env.doctor_token_secret)
        res.cookie("doctorToken",doctorToken)
        res.json({
            success:true,
            message :"done!",
            doctor
        })
    } catch (error) {
        console.log(error)
    }
}
const protectDoctorRoutes = async(req,res,next) => {
    const {doctorToken} = req.cookies;
    console.log({doctorToken})
    try {
        const {email} = await jwt.verify(doctorToken,process.env.doctor_token_secret);
        if(!email) {
            return res.json({
                success:false,
                message:"no authorized"
            })
        }
        req.doctorEmail = email
        next()
    } catch (error) {
        console.log(error)
    }
}
const doctorData = async(req,res) => {
    console.log("yes")
    try {
        if(!req.doctorEmail) {
            return res.json({
                success:false,
                message:"not authorized"
            })
        }
        await main()
        const doctor = await Doctor.findOne({email:req.doctorEmail}).select("-password")
        res.json({
            success:true,
            doctor
        })
    } catch (error) {
        console.log(error)
    }
}
const doctorLogout = async(req,res) => {
    try {
        res.clearCookie("doctorToken")
        res.json({
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
}
const dashboardDoctorData = async(req,res) => {
    const {doctorId} = req.body
    try {
        await main();
        const appointments = await Appointment.find({doctorId,cancelled:false})
        const totalAppointments = appointments.length
        let totalEarnings = 0;
        appointments.forEach((appointment)=> {
            totalEarnings+=appointment.amount;
        })
        const latestAppointments = await Appointment.find({doctorId}).populate({
            path:"userId",
            select:"-password -email"
        }).populate({
            path:"doctorId",
            select:"-password -email"
        }).limit(6).sort({createdAt:-1})
        res.json({
            success:true,
            info :{
                latestAppointments,
                totalEarnings,
                totalAppointments
            }

        })
    } catch (error) {
        console.log(error)
    }
}
const getDoctorAppointments = async(req,res) => {
    const {doctorId} = req.body;
    try {
        await main();
        const appointments = await Appointment.find({doctorId}).populate({
            path:"userId",
            select:"-password"
        })
        res.json({
            success:true,
            appointments
        })
    } catch (error) {
        console.log(error)
    }
} 
const updateProfile = async(req,res) => {
    const {
        userId,about,avaliable,
        fees,address
    } = req.body
    try {
        await main();
        const doctor = await Doctor.findByIdAndUpdate(userId,{
            fees,
            avaliable,
            about,
            address:JSON.parse(address)
        })
        res.json({
            success:true,
            message:"updated !"
        })
    } catch (error) {
        console.log(error)
    }
}
const getDoctorsForUser = async(req,res)=> {
    try {
        await main();
        const doctors = await Doctor.find({available:true}).select("-password  -email")
        res.json({
            success:true,
            doctors
        })
    } catch (error) {
        console.log(error)
    }
} 

module.exports = {
    doctorLogin,
    protectDoctorRoutes,
    doctorData,
    doctorLogout,
    dashboardDoctorData,
    getDoctorAppointments,
    updateProfile,
    getDoctorsForUser
}