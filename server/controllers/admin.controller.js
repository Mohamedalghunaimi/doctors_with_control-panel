var jwt = require('jsonwebtoken');
const { cloudinary } = require("../methods/cloudinary");
const { Appointment } = require("../models/appointment");
const { Doctor } = require("../models/Doctor");
const { User, main } = require("../models/user");
require("dotenv").config()
const bcrypt = require("bcryptjs")

const addDoctor = async(req,res)=> {
    const {name,email,password,address,speciality,degree,experience,fees,about} = req.body;
        if(!email||!password||!name||!address||!speciality||!degree||!experience||!fees||!about||!req.file) {
            return res.json({
                success:false,
                message:"missing details!"
            })
        }

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'demo',
    });
    const image = result.secure_url;
    const date = Date.now();
    const originalAddress = JSON.parse(address) 

    try {
        await main()
        

        const doctor = await Doctor.findOne({email,name})
        if(doctor) {
            return res.json({
                success:false,
                message:"the doctor is already exists in the list"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newDoctor = new Doctor({
            ...req.body,
            password:hashedPassword,
            image,
            date,
            address:originalAddress,
            fees:Number(fees)
        })
        await newDoctor.save()
        res.json({
            success:true,
            message:"doctor is added to the list"
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}

const getDoctors =async(req,res) => {
    try {
        await main();
        const doctors = await Doctor.find({}).select("-password -email")
        res.json({
            success:true,
            doctors
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
const getAppointments =  async(req,res) => {
    try {
        await main();
        const appointments = await Appointment.find({}).populate({ 
            path: 'userId', 
            select: '-password -email' 
        }).populate({
            path: 'doctorId', 
            select: '-password -email' 
        })       
        res.json({
            success:true,
            appointments
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
const dashboardData = async(req,res) => {
    try {
        await main();
        const doctors = await Doctor.find({})
        const totalDoctors = doctors.length;
        const appointments1 = await Appointment.find({});
        const totalAppointments = appointments1.length;
        const users = await User.find({})
        const totalPatients = users.length;
        const appointments = await Appointment.find({}).populate({
            path:"doctorId",
            select:"_id image name"
        }).limit(6).sort({createdAt:-1});

        res.json({
            success:true,
            info :{
            totalDoctors,
            totalPatients,appointments,
            totalAppointments
        }
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
const adminLogin = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.json({
            success:false,
            message:"missing details"
        })
    }
    try {
        if((process.env.admin_email!==email)||(process.env.admin_password!==password)) {
            return res.json({
                success:false,
                message:"not authorized !"
            })
        }
        const admin_token = await jwt.sign(email+password,process.env.admin_token_secret) 
        res.cookie("adminToken",admin_token)
        res.json({
            success:true,
            message:"done!"
        })
    } catch (error) {
        console.log(error)
    }
}
const isAdmin = async(req,res,next) => {
    const {adminToken} = req.cookies
    console.log({adminToken})
    try {
        const decodedToken = await jwt.verify(adminToken,process.env.admin_token_secret)

        if(decodedToken!==(process.env.admin_email+process.env.admin_password)) {
            return res.json({
                success:false,
                message:"not authorized"
            })
        }
        req.adminEmail = process.env.admin_email
        next()
    } catch (error) {
        console.log(error)
    }
}
const adminLogout = async(req,res) => {
    try {
        res.clearCookie("adminToken")
        res.json({
            success:true
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
const authAdmin = async(req,res) => {
    try {
        if(!req.adminEmail) {
            return res.json({
                success:false,
                message:"not authorized"
            })
        }
        
        res.json({
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
const canceledAppointmentByAdmin = async(req,res) => {
    const {appointmentId,doctorId} = req.body
    try {
        await main()
        const appointment = await Appointment.findOne({
            _id:appointmentId,
            doctorId,
        })
       

        if(!appointment) {
            return res.json({
                success:false,
                message : "appointment not found"
            })
        }
        if(appointment.cancelled) {
            return res.json({
                success:false,
                message : "appointment is already cancelled"
            })
        }
        if(appointment.isCompleted) {
            return res.json({
                success:false,
                message : "appointment is completed"
            })
        }
        if(appointment.payment) {
            return res.json({
                success:false,
                message : "you can't cancele it ,it's paied"
            })
        }
        const doctor = await Doctor.findById(doctorId)
        if(!doctor) {
            return   res.json({
                meessage:"doctor is not exist",
                success:false
            })
        }
        const copy = structuredClone(doctor.slots_books)
        copy[appointment.slotDate] = copy[appointment.slotDate].filter(item => item !== appointment.slotTime);
        if(copy[appointment.slotDate].length===0) {
            delete copy[appointment.slotDate]
        }
        doctor.slots_books = copy
        await doctor.save();
        const updatedAppointment = await Appointment.findOneAndUpdate({
            _id:appointmentId,
            doctorId,
        },
            {cancelled:true,isCompleted:false},
            {new:true}
        )
        .populate([
            {
                path: 'userId', 
                select: '-password -email' 
            },
            {
                path: 'doctorId', 
                select: '-password -email' 
            }
        ])

        res.json({
            success:true,
            appointment:updatedAppointment

        })
    } catch (error) {
        console.log(error)
    }
}
const updateDoctor = async(req,res) => {
    const {doctorId,available} = req.body
    try {
        await main()
        const existingDoctor = await Doctor.findById(doctorId);
        if(!existingDoctor) {
            return res.json({
                success:false,
                message:"doctor not found"
            })
        }
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId,{
            available
        },{new:true})
        res.json({
            success:true,
            message:"updated",
            doctor:updatedDoctor

        })
    } catch (error) {
        console.error(error);
        return res.json({
            success:false,
            message:"something went wron in the server"
        })
    }
}

module.exports = {
    addDoctor,
    getDoctors,
    getAppointments,
    dashboardData,
    adminLogin,
    isAdmin,
    adminLogout,
    authAdmin,
    canceledAppointmentByAdmin,
    updateDoctor

}