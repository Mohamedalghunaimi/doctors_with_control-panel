const { main, User } = require("../models/user")
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../methods/cloudinary");
const { Doctor } = require("../models/Doctor");
require("dotenv").config()




const register = async(req,res) => {
    const {email,name,password} = req.body;
    try {
        await main()
        const user = await User.findOne({email})
        if(user){
            return res.json({
                success:false,
                message:"the user is already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const token = await jwt.sign({email},process.env.token_secret)
        res.cookie("token",token)
        const newUser = new User({
            email,
            password:hashedPassword,
            name
        })
        const savedUser =await newUser.save();
        res.json({
            success:true,
            message:"register operation is done",
            user:savedUser
        })
    } catch (error) {
        console.log(error)
    }
}
const login = async(req,res) => {
    const {email,password} = req.body
    try {
        await main();
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                success:false,
                message:"invalid inputs"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.json({
                success:false,
                message:"invalid inputs"
            })
        }
        const token = await jwt.sign({email},process.env.token_secret)
        res.cookie("token",token)
        res.json({
            success:true,
            message:"the login operation is done !",
            user
        })
    } catch (error) {
        console.log(error)
    }
}
const protectAuth = async(req,res,next) => {
    try {
        await main();
        const {email} = await jwt.verify(req.cookies.token,process.env.token_secret)
        if(!email) {
            return res.json({
                success:false,
                message:"not authorized"
            })
        }
        req.email = email,
        next()
    } catch(error) {
        console.log(error)
    }
}
const isAuth = async(req,res) => {
    const email = req.email
    try {
        const user = await User.findOne({email},{__v:false})
        if(!user) {
            return res.json({
                success:false,
                message:"not authorized"
            })
        }
        res.json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error)
    }
}
const updateProfile = async(req,res) => {
    const {email,phone,address,birthday,gender,userId} = req.body;
    if(!email||!phone||!address||!birthday||!gender) {
        return res.json({
            success:false,
            message:"missing details"
        })
    }

    try {
        const result = await cloudinary.uploader.upload(req.body.image||req.file.path, {
            folder: 'demo',
        });
        const image = result.secure_url;
        await main();
        const updatedUser = await User.findByIdAndUpdate(userId,{
            email,phone,address:JSON.parse(address),birthday,gender,image
            

        },{new:true}).select("-password")
        res.json({
            success:true,
            user:updatedUser
        })
        
    } catch (error) {
        console.log(error)
    }
}
const logout = async(req,res) => {
    try {
        res.clearCookie("token")
        res.json({
            success:true
        })
    } catch (error) {
        
    }
}


module.exports = {
    register,login,protectAuth,isAuth,
    updateProfile,logout
}