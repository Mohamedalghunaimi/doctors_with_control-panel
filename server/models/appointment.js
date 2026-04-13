const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    doctorId:{type: mongoose.Schema.Types.ObjectId,required:true,ref:"Doctor"},
    slotDate :{type:String,required:true},
    slotTime:{type:String,required:true},
    date:{type:Number,required:true},
    cancelled:{type:Boolean,default:false},
    payment:{type:Boolean,default:false},
    isCompleted:{type:Boolean,default:false},
    amount:{type:Number,required:true}
},{timestamps:true,minimize:false})
const Appointment = mongoose.model("appointment",appointmentSchema)

module.exports = {
    Appointment
}