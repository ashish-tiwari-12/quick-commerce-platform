// import { Resend } from 'resend';
// import dotenv from 'dotenv';
// dotenv.config();

// if (!process.env.RESEND_API) {
//     console.log("Provide RESEND_API inside the .env file");
// }

// const resend = new Resend(process.env.RESEND_API);

// const sendEmail = async ({ sendTo, subject, html }) => {
//     try {
//         const data = await resend.emails.send({
//             from: 'onboarding@resend.dev',
//             to: [sendTo], // use the email passed in function
//             subject: subject,
//             html: html,
//         });

//         console.log("Email sent:", data);
//         return data;
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// };

// export default sendEmail;

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Binkeyit" <${process.env.EMAIL_USER}>`,
            to: sendTo,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};

export default sendEmail;
