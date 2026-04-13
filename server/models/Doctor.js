const mongoose = require("mongoose")
const doctorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    available:{type:Boolean,required:true},
    fees :{type:Number,required:true},
    address :{type:Object,required:true},
    date:{type:Number,required:true},
    slots_books :{
        type:Object,
        default:{}
    },
    about :{type:String,required:true}
},{minimize:false})


const Doctor = mongoose.model("Doctor",doctorSchema)

module.exports = {
    Doctor
}