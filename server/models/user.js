const mongoose = require("mongoose")
require("dotenv").config()
const main = async()=> {
    await mongoose.connect(process.env.db_url)
}
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        isEmail:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        default:"000000000000000"
    },
    birthday :{
        type:String,
        default:(new Date()).toDateString()
    },
    gender:{
        type:String,
        enum:["male","female","not selected"],
        default:"not selected"
    },
    address:{
        type:Object,
        default:{
            line1:"",
            line2:""
        }
    },
    job :{
        type:String,
        default:"not selected"
    },
    image :{
        type:String ,
        default:"https://th.bing.com/th/id/R.b2b34517339101a111716be1c203f354?rik=e5WHTShSpipi3Q&pid=ImgRaw&r=0"
    }
},{timestamps:true})
const User = mongoose.model("User",userSchema)

module.exports = {
    User,
    main

}