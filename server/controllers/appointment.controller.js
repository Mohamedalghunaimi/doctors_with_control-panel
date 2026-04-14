const { Appointment } = require("../models/appointment");
const { Doctor } = require("../models/Doctor");
const { main, User } = require("../models/user");
const Stripe = require('stripe');
var jwt = require('jsonwebtoken');
const { trusted } = require("mongoose");
require("dotenv").config()
const stripe = Stripe(process.env.stripe_secret)
const addAppointment = async(req,res) => {
    const {
        userId,
        doctorId,
        slotDate,slotTime,
        amount,
    } = req.body
    try {
        await main();
        const user = await User.findById(userId).select("email _id");
        if(!user) {
            return res.json({
                success:false,
                message:"user not found"
            })
        }
        if(user.email!==req.email) {
            return res.json({
                success:false,
                message:"forbidden"
            })
        }
        const doctor = await Doctor.findOne({_id:doctorId,available:true});
        if(!doctor) {
            return res.json({
                success:false,
                message:"there is no doctor"
            })
        }

        const bookedSlots = structuredClone(doctor.slots_books)
        if(bookedSlots[slotDate]) {
            if(bookedSlots[slotDate].includes(slotTime)) {
                
                return res.json({
                    success:false,
                    message:"doctor is busy at this time"
                })
            }
            bookedSlots[slotDate].push(slotTime)
        } else {
            bookedSlots[slotDate]=[]
            bookedSlots[slotDate].push(slotTime)
        }
        doctor.slots_books = bookedSlots
        await doctor.save();
        const existingAppointment = await Appointment.findOne({
            userId,
            doctorId,
            slotDate,
            slotTime,

        })
        if(existingAppointment) {
            return res.json({
                success:false,
                message:"appointment is already exist"
            })
        }
        const newAppointment = new Appointment({
            userId,
            doctorId,
            slotDate,slotTime,
            amount:Number(amount),
            date:Date.now()
        })
        await newAppointment.save();
        res.json({
            success:true,
            message:"appointment is added",
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })

    }
}
const changeAvaliablity = async(req,res)=> {
    const {doctorId,available} = req.body
    try {
        await main();
        await Doctor.findByIdAndUpdate(doctorId,{available})
        res.json({
            success:true,
            message:"done !"
        })
    } catch (error) {
        console.log(error)
    }
}
const canelAppointmentForDoctor= async(req,res)=> {
    const {appointmentId,doctorId} = req.body


    

    try {
        await main();
        const doctor = await Doctor.findById(doctorId)
        if(!doctor) {
            return res.json({
                success:false,
                message:"doctor not found"
            })
        }
        if(req.doctorEmail!==doctor.email) {
            return res.json({
                success:false,
                message:"forbidden"
            })
        }
        const appointment = await Appointment.findOne({
            _id:appointmentId,
            doctorId,
        }).populate([
            {
                path:"userId",
                select:"-password -email"
            },

        ])

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
        appointment.cancelled = true;
        const canceledAppointment = await appointment.save();

        const copy = structuredClone(doctor.slots_books)
        copy[appointment.slotDate] = copy[appointment.slotDate].filter(item => item !== appointment.slotTime);
        if(copy[appointment.slotDate].length===0) {
            delete copy[appointment.slotDate]

        }
        doctor.slots_books = copy
        await doctor.save()



        res.json({
            success:true,
            appointment:canceledAppointment
        })
    } catch (error) {
        console.log(error)
    }
}
const appointmentCompleted = async(req,res)=> {
    const {doctorId,appointmentId} = req.body;
    
    try {
        await main();
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.json({
                success:false,
                message:"doctor not found"
            })
        }
        if(doctor.email!==req.doctorEmail) {
            return res.json({
                success:false,
                message:"forbidden"
            })
        }

        const appointment = await Appointment.findOne({
            doctorId,
            _id:appointmentId,
        }).populate([
            {
                path:"userId",
                select:"-password -email"
            },

        ]);
        if(appointment.cancelled) {
            return res.json({
                success:false,
                message:"appointment is cancelled"
            })
        } 
        if(appointment.payment) {
            return res.json({
                success:false,
                message:"appointment is not paied"
            })
        }
        if(appointment.isCompleted) {
            return res.json({
                success:false,
                message:"appointment is completed"
            })
        }
        appointment.isCompleted = true;
        await appointment.save();
        const copy = structuredClone(doctor.slots_books)
        copy[appointment.slotDate] = copy[appointment.slotDate].filter(item => item !== appointment.slotTime);
        if(copy[appointment.slotDate].length===0) {
            delete copy[appointment.slotDate]

        }
        doctor.slots_books = copy
        await doctor.save()


        res.json({
            success:true,
            appointment
        })
    } catch (error) {
        console.log(error)
    }

}
const appointmentsForUser = async(req,res) => {
    const {userId} = req.body
    try {
        await main();
        
        const user = await User.findById(userId).select('email');
        if(!user) {
            return res.json({
                success:false,
                message:"user not found"
            })
        }
        if(user.email!==req.email) {
            return res.json({
                success:false,
                message:"forbidden"
            })        
        }
        let appointments = await Appointment.find({userId,cancelled:false}).populate({
            path:'doctorId',
            select:"-password -slots_books -email"
        })


        return res.json({
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

const cancelAppointmentForUser = async(req,res) => {
    const {userId,appointmentId} = req.body
    
    try {
        await main();
        const user = await User.findById(userId).select("email");
        if(!user) {
            return res.json({
                success:false,
                message:"user not found"
            })
        }
        if(user.email!==req.email) {
            return res.json({
                success:false,
                message:"forbidden"
            })
        }
        const appointment =await Appointment.findOneAndUpdate({_id:appointmentId,userId,isCompleted:false},{
            cancelled:true
        },{new:true})
        if(!appointment) {
            return res.json({
                success:true,
                message:"is completed"
            })
        }
        const doctor = await Doctor.findById(appointment.doctorId)  
        const copy = structuredClone(doctor.slots_books)
        copy[appointment.slotDate] = copy[appointment.slotDate].filter(item => item !== appointment.slotTime);
        doctor.slots_books = copy
        await doctor.save()

        return res.json({
            success:true,
            message:"cancelled",
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
const payOnline = async(req,res) => {
    const {appointmentId} = req.body

    try {
        await main();
        const appointment = await Appointment.findById(appointmentId).populate({
            path:"userId",
            select:"-password -email "
        }).populate({
            path:"doctorId",
            select:"-password -email -slots_books "   
        })
        const token = await jwt.sign({appointmentId:appointment._id},process.env.stripe_secret)
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
        price_data: {
            currency: 'usd',
            product_data: {
            name: `appointment for ${appointment.doctorId.name}`,
            },
            unit_amount: appointment.amount*1000, 
        },
        quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?token=${token}`,
        cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({success:true, url: session.url });

    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }

}
const isPaied = async(req,res) => { 
    const {token} = req.body
    try {
        await main();
        const decodedToken = await jwt.verify(token,process.env.stripe_secret)
        const appointment = await Appointment.findByIdAndUpdate(decodedToken.appointmentId,{
            payment:true
        })
        res.json({
            success:true,
            message:"successfully payment!"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success:false,
            message:"something went wrong in the server"
        })
    }
}
module.exports = {
    addAppointment,
    canelAppointmentForDoctor,
    appointmentsForUser,
    appointmentCompleted,
    cancelAppointmentForUser,
    payOnline,
    isPaied,
    changeAvaliablity
}
