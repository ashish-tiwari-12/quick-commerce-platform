import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import OtpModel from '../models/otp.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import jwt from 'jsonwebtoken'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import generatedRefreshToken from '../utils/generatedRefreshToken.js'
import uploadImageClodinary from '../utils/uploadImageCloudinary.js'
import generatedOtp from '../utils/generatedOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'

// Send OTP before registration to verify email
export async function sendRegistrationOtpController(request, response) {
    try {
        const { email, name } = request.body

        if (!email) {
            return response.status(400).json({
                message: "Please provide an email address",
                error: true,
                success: false
            })
        }

        const normalizedEmail = email.toLowerCase().trim()

        // Check if user is already registered in the database
        const existingUser = await UserModel.findOne({ email: normalizedEmail })
        if (existingUser) {
            return response.status(400).json({
                message: "This email is already registered. Please login.",
                error: true,
                success: false
            })
        }

        // Generate 6-digit numeric OTP
        const otp = generatedOtp()

        // Save OTP in OtpModel (TTL auto-deletes in 10 minutes)
        await OtpModel.findOneAndUpdate(
            { email: normalizedEmail },
            { otp, createdAt: new Date() },
            { upsert: true, new: true }
        )

        // Send Email with Ashivo template
        await sendEmail({
            sendTo: normalizedEmail,
            subject: `Your Ashivo Verification Code: ${otp}`,
            text: `Hello ${name || 'User'},\n\nYour Ashivo 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nThank you,\nAshivo Team`,
            html: verifyEmailTemplate({
                name: name || "User",
                otp: otp
            })
        })

        return response.json({
            message: "Verification OTP sent to your email successfully.",
            error: false,
            success: true
        })

    } catch (error) {
        console.error("sendRegistrationOtpController Error:", error)
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Verify OTP before completing registration
export async function verifyRegistrationOtpController(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide email and 6-digit OTP",
                error: true,
                success: false
            })
        }

        const normalizedEmail = email.toLowerCase().trim()
        const otpRecord = await OtpModel.findOne({ email: normalizedEmail })

        if (!otpRecord) {
            return response.status(400).json({
                message: "OTP expired or not found. Please request a new OTP.",
                error: true,
                success: false
            })
        }

        if (otpRecord.otp !== otp.toString().trim()) {
            return response.status(400).json({
                message: "Invalid 6-digit OTP code",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Email verified successfully!",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Register user ONLY after email is verified with OTP
export async function registerUserController(request, response) {
    try {
        const { name, email, password, role, otp } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide name, email, and password",
                error: true,
                success: false
            })
        }

        const normalizedEmail = email.toLowerCase().trim()

        const existingUser = await UserModel.findOne({ email: normalizedEmail })
        if (existingUser) {
            return response.status(400).json({
                message: "This email is already registered. Please login.",
                error: true,
                success: false
            })
        }

        // Verify OTP from OtpModel
        if (!otp) {
            return response.status(400).json({
                message: "Please verify your email with OTP first",
                error: true,
                success: false
            })
        }

        const otpRecord = await OtpModel.findOne({ email: normalizedEmail })
        if (!otpRecord || otpRecord.otp !== otp.toString().trim()) {
            return response.status(400).json({
                message: "Email is not verified. Please verify your OTP first.",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const userRole = (role && ['ADMIN', 'USER'].includes(role.toUpperCase()))
            ? role.toUpperCase()
            : 'USER'

        const payload = {
            name,
            email: normalizedEmail,
            password: hashPassword,
            role: userRole,
            verify_email: true, // Registered directly as verified!
            status: "Active"
        }

        const newUser = new UserModel(payload)
        const savedUser = await newUser.save()

        // Clean up OTP after successful registration
        await OtpModel.deleteOne({ email: normalizedEmail })

        return response.json({
            message: "Registration successful! You can now log in.",
            error: false,
            success: true,
            data: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailOtpController(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide email and OTP",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email is not registered",
                error: true,
                success: false
            })
        }

        if (user.verify_email) {
            return response.json({
                message: "Email is already verified",
                success: true,
                error: false
            })
        }

        const currentTime = new Date()

        if (user.email_verify_expiry && new Date(user.email_verify_expiry) < currentTime) {
            return response.status(400).json({
                message: "OTP has expired. Please request a new one.",
                error: true,
                success: false
            })
        }

        if (otp !== user.email_verify_otp) {
            return response.status(400).json({
                message: "Invalid OTP code",
                error: true,
                success: false
            })
        }

        // OTP is valid -> Mark email as verified
        await UserModel.findByIdAndUpdate(user._id, {
            verify_email: true,
            email_verify_otp: null,
            email_verify_expiry: null
        })

        return response.json({
            message: "Email verified successfully! You can now log in.",
            success: true,
            error: false
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function resendEmailOtpController(request, response) {
    try {
        const { email } = request.body

        if (!email) {
            return response.status(400).json({
                message: "Provide email address",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email not registered",
                error: true,
                success: false
            })
        }

        if (user.verify_email) {
            return response.status(400).json({
                message: "Email is already verified",
                error: true,
                success: false
            })
        }

        const otp = generatedOtp()
        const expireTime = Date.now() + 10 * 60 * 1000 // 10 mins

        await UserModel.findByIdAndUpdate(user._id, {
            email_verify_otp: otp,
            email_verify_expiry: new Date(expireTime)
        })

        await sendEmail({
            sendTo: email,
            subject: `Your New Ashivo Verification Code: ${otp}`,
            text: `Hello ${user.name || 'User'},\n\nYour new Ashivo 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nThank you,\nAshivo Team`,
            html: verifyEmailTemplate({
                name: user.name,
                otp: otp
            })
        })

        return response.json({
            message: "A new OTP has been sent to your email",
            error: false,
            success: true
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

        await UserModel.updateOne({ _id: code }, {
            verify_email: true,
            email_verify_otp: null,
            email_verify_expiry: null
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
            success: false
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

        // Enforce Email Verification Check
        if (!user.verify_email) {
            const otp = generatedOtp()
            const expireTime = Date.now() + 10 * 60 * 1000

            await UserModel.findByIdAndUpdate(user._id, {
                email_verify_otp: otp,
                email_verify_expiry: new Date(expireTime)
            })

            await sendEmail({
                sendTo: user.email,
                subject: `Your Ashivo Verification Code: ${otp}`,
                text: `Hello ${user.name || 'User'},\n\nYour Ashivo 6-digit verification code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nThank you,\nAshivo Team`,
                html: verifyEmailTemplate({
                    name: user.name,
                    otp: otp
                })
            })

            return res.status(400).json({
                message: "Email is not verified. A new 6-digit OTP has been sent to your email.",
                error: true,
                success: false,
                unverified: true,
                email: user.email
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshtoken = await generatedRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

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
            success: true,
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
    try {
        console.log("LOGOUT HIT ✅")
        const userid = req.userId
        console.log("USER ID 👉", userid)
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }
        res.clearCookie('accessToken', cookiesOption)
        res.clearCookie('refreshToken', cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })


        return res.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    }
    catch (error) {
        console.log("LOGOUT ERROR ❌", error)
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function uploadAvatar(request, response) {
    try {
        const userId = request.userId // auth middlware
        const image = request.file  // multer middleware

        const upload = await uploadImageClodinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return response.json({
            message: "upload profile",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updateUserDetails(request, response) {
    try {
        const userId = request.userId //auth middleware
        const { name, email, mobile, password } = request.body

        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword })
        })

        return response.json({
            message: "Updated successfully",
            error: false,
            success: true,
            data: updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({
                message: "Provide email",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Email not register",
                error: true,
                success: false
            })
        }
        const otp = generatedOtp()
        const expireTime = Date.now() + 10 * 60 * 1000 //10min

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expire: new Date(expireTime).toISOString()
        })
        await sendEmail({
            sendTo: email,
            subject: `Ashivo Password Reset Code: ${otp}`,
            text: `Hello ${user.name || 'User'},\n\nYour 6-digit password reset code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nThank you,\nAshivo Team`,
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })

        return res.json({
            message: "Otp send to email",
            error: false,
            success: true,
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

export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide required field email, otp.",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()

        if (user.forgot_password_expire < currentTime) {
            return response.status(400).json({
                message: "Otp is expired",
                error: true,
                success: false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return response.status(400).json({
                message: "Invalid otp",
                error: true,
                success: false
            })
        }

        //if otp is not expired
        //otp === user.forgot_password_otp

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        })

        return response.json({
            message: "Verify otp successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide email, newPassword and confirmPassword",
                error: true,
                success: false
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "newPassword and confirmPassword not match",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Email not register",
                error: true,
                success: false
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)
        const updateUser = await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword,
            forgot_password_otp: null,
            forgot_password_expire: null
        })
        return res.json({
            message: "Password reset successfully",
            error: false,
            success: true,
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

export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return response.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', newAccessToken, cookiesOption)

        return response.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function userDetails(request, response) {
    try {
        const userId = request.userId

        // console.log("user good "+userId)

        // const user = await UserModel.findById(userId).select('-password -refresh_token')
        const user = await UserModel.findById(userId)
        return response.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}