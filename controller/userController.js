const User = require('../models/userLoginModel');
const ErroHandler = require('../utils/errorHandler');
const { sendToken } = require('../utils/jsonToken');
const cloudinary = require('cloudinary').v2; 

const userRegister = async (req, res, next) => {
    try {
        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        });

        sendToken(user, 200, res);
    } catch (e) {
        return next(new ErroHandler(e.message, 500)); // Use appropriate status code (500 for internal server error)
    }
};


const userLogin=async(req,res,next)=>{
    try{

        const {email,password}=req.body;
       if(!email||!password){
        return next(new ErroHandler("Enter Your Email and Password!",400));
       }

       const user=await User.findOne({email:email}).select("+password");

       if(!user){
       return res.status(400).json({
            success:false,
            message:"user is not present in database!"
        })
       }

       const isPassword=await user.isCompare(password);
       
       if(!isPassword){
        return next(new ErroHandler("user email or password is incorrect!",400));
       }
      
       sendToken(user,201,res);

    }catch(e){
        return res.status(404).json({
            success:false,
            message:e.message
        })
    }
}

const getUserDetail=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user._id);

        if(!user){
            return next(new ErroHandler("you have to login to access this page!",400));
        }

        res.status(200).json({
            success:true,
            user
        })

    }catch(e){
        return next(new ErroHandler(e.message,404));
    }
}

const userLogout=async(req,res,next)=>{
    try{
        res.cookie("token", null,{
            expiresIn:new Date(Date.now()),
            httpOnly:true 
        })

        res.status(200).json({
            success:true,
            message:"user Logged Out!"
        })

    }catch(e){
        return next(new ErroHandler(e.message,404));
    }
}



module.exports={userRegister,userLogin,getUserDetail,userLogout};