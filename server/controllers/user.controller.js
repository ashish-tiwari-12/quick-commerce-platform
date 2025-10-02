import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import jwt from 'jsonwebtoken'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedRefreshToken from '../utils/generatedRefreshToken.js'
import uploadImageClodinary from '../utils/uploadImageCloudinary.js'
import generatedOtp from '../utils/generatedOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from binkeyit",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        })

        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id: code })

        if (!user) {
            return response.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "Verify email done",
            success: true,
            error: false
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

export async function loginControllere(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Provide email and password",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false
            })
        }
        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Contact to admin",
                error: true,
                success: false
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
                error: true,
                success: false
            })
        }
        const accessToken = await generatedAccessToken(user._id)
        const refreshtoken = await generatedRefreshToken(user._id)
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken', accessToken, cookiesOption)
        res.cookie('refreshToken', refreshtoken, cookiesOption)

        return res.json({
            message: "Login successfully",
            error: false,
            superss: true,
            data: { accessToken, refreshtoken }
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function logoutController(req, res) {
    try{
        const userid = request.userId

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }
        res.clearCookie('accessToken',cookiesOption)
        res.clearCookie('refreshToken',cookiesOption)
        
        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })


        return res.json({
            message: "Logout successfully",
            error: false,
            success: true
        })    
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async  function uploadAvatar(request,response){
    try {
        const userId = request.userId // auth middlware
        const image = request.file  // multer middleware

        const upload = await uploadImageClodinary(image)
        
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "upload profile",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile, password } = request.body 

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await UserModel.updateOne({ _id : userId},{
            ...(name && { name : name }),
            ...(email && { email : email }),
            ...(mobile && { mobile : mobile }),
            ...(password && { password : hashPassword })
        })

        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function forgotPasswordController(req,res){
    try{
        const {email}=req.body
        if(!email){
            return res.status(400).json({
                message : "Provide email",
                error : true,
                success : false
            })
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Email not register",
                error : true,
                success : false
            })
        }
        const otp=generatedOtp()
        const expireTime=Date.now()+10*60*1000 //10min
        
        const update =await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expire: new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo : email,
            subject : "Forgot password otp from binkeyit",
            html : forgotPasswordTemplate({
                name : user.name,
                otp:otp
            })
        })

        return res.json({
            message : "Otp send to email",
            error : false,
            success : true,
        })
    }
    catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function verifyForgotPasswordOtp(req,res){
    try{
        const {email,otp}=req.body
        if(!email || !otp){
            return res.status(400).json({
                message : "Provide email and otp",
                error : true,
                success : false
            })
        }   
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Email not register",
                error : true,
                success : false
            })
        }
         const currentTime=Date.now()
         if(user.forgot_password_otp !== otp || new Date(user.forgot_password_expire).getTime() < currentTime){
            return res.status(400).json({
                message : "Invalid or expire otp",
                error : true,
                success : false
            })
         }
        return res.json({
            message : "Otp verified",
            error : false,
            success : true
        })
    }
    catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function resetPassword(req,res){
    try{
        const {email,newPassword,confirmPassword}=req.body
        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "Provide email, newPassword and confirmPassword",
                error : true,
                success : false
            })
        }   
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "newPassword and confirmPassword not match",
                error : true,
                success : false
            })
        }
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Email not register",
                error : true,
                success : false
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)
        const updateUser=await UserModel.findByIdAndUpdate(user._id,{
            password : hashPassword,
            forgot_password_otp : null,
            forgot_password_expire : null
        })
        return res.json({
            message : "Password reset successfully",
            error : false,
            success : true,
        })

    }
    catch(error){
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function refreshToken(request,response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return response.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return response.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function userDetails(request,response){
    try {
        const userId  = request.userId

        console.log(userId)

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message : 'user details',
            data : user,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : "Something is wrong",
            error : true,
            success : false
        })
    }
}