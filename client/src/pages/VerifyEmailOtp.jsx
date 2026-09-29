import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const VerifyEmailOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location?.state?.email || "";

    useEffect(() => {
        if (!email) {
            toast.error("Please enter your email to verify");
        }
    }, [email]);

    // Resend countdown timer
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const isOtpComplete = otp.every((digit) => digit.trim() !== "");

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("");
            setOtp(digits);
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email is missing. Please register again.");
            navigate("/register");
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.verify_email_otp,
                data: {
                    email: email,
                    otp: otp.join("")
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!canResend || resendLoading) return;

        try {
            setResendLoading(true);
            const response = await Axios({
                ...SummaryApi.resend_email_otp,
                data: { email }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setTimer(60);
                setCanResend(false);
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <section className='w-full min-h-[80vh] flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-primary/5 via-[#F5F3FF] to-[#A78BFA]/10'>
            <div className='bg-white/90 backdrop-blur-md w-full max-w-lg mx-auto rounded-3xl p-8 lg:p-10 shadow-xl border border-purple-100/50'>
                <div className='text-center mb-6'>
                    <div className='w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner'>
                        <FaShieldAlt className='text-2xl' />
                    </div>
                    <span className='inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider'>
                        Email Verification ⚡
                    </span>
                    <h2 className='text-3xl font-black text-secondary tracking-tight font-display mb-1.5'>
                        Verify Your Email
                    </h2>
                    <p className='text-xs lg:text-sm text-gray-500 font-medium'>
                        We have sent a 6-digit verification code to
                    </p>
                    <div className='inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-purple-50 rounded-lg text-primary text-xs font-bold'>
                        <MdOutlineEmail className='text-sm' />
                        <span>{email || 'your email address'}</span>
                    </div>
                </div>

                <form className='grid gap-6 mt-4' onSubmit={handleSubmit}>
                    <div className='grid gap-2'>
                        <label className='text-xs lg:text-sm font-bold text-secondary text-center'>
                            Enter 6-Digit OTP Code
                        </label>
                        <div className='flex items-center gap-2 sm:gap-3 justify-center mt-1' onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={"otp-box-" + index}
                                    type='text'
                                    inputMode='numeric'
                                    maxLength={1}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='bg-[#F5F3FF]/60 w-11 sm:w-12 aspect-square border border-purple-100/90 rounded-xl outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-center font-black text-secondary text-xl shadow-sm'
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center justify-between text-xs text-gray-500 font-semibold px-1'>
                        <span>Didn't receive the OTP?</span>
                        {canResend ? (
                            <button
                                type='button'
                                onClick={handleResendOtp}
                                disabled={resendLoading}
                                className='text-primary hover:text-primary-hover font-bold hover:underline cursor-pointer disabled:opacity-50'
                            >
                                {resendLoading ? "Sending..." : "Resend OTP"}
                            </button>
                        ) : (
                            <span className='text-gray-400 font-medium'>
                                Resend in <span className='text-primary font-bold'>{timer}s</span>
                            </span>
                        )}
                    </div>

                    <button
                        disabled={!isOtpComplete || loading}
                        className={`w-full py-3.5 rounded-xl font-extrabold tracking-wider text-sm transition-all duration-300 shadow-md ${
                            isOtpComplete && !loading
                                ? "bg-primary hover:bg-primary-hover active:scale-[0.98] hover:shadow-[0_4px_12px_rgba(108,99,255,0.25)] text-white cursor-pointer"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                        }`}
                    >
                        {loading ? "Verifying..." : "Verify & Activate Account"}
                    </button>
                </form>

                <p className='text-xs lg:text-sm text-gray-500 font-medium mt-6 text-center border-t border-purple-50/80 pt-6'>
                    Need to change email or login? <Link to={"/login"} className='font-bold text-primary hover:text-primary-hover hover:underline'>Back to Login</Link>
                </p>
            </div>
        </section>
    );
};

export default VerifyEmailOtp;
