const forgotPasswordTemplate = ({ name, otp }) => {
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Your Ashivo Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f0ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Outer Background Table -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f0ff; min-height: 100vh; padding: 30px 15px;">
        <tr>
            <td align="center" valign="top">
                
                <!-- Main Email Card Container (Max Width 540px) -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 12px 35px rgba(108, 99, 255, 0.12); border: 1px solid #e9e5ff;">
                    
                    <!-- Header Banner with Gradient -->
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%); padding: 36px 20px 32px 20px; text-align: center;">
                            <!-- App Name / Logo -->
                            <h1 style="margin: 0; font-size: 32px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                                Ashivo<span style="color: #FBBF24;">⚡</span>
                            </h1>
                            <p style="margin: 6px 0 0 0; font-size: 13px; font-weight: 600; color: #DDD6FE; letter-spacing: 0.5px; text-transform: uppercase;">
                                Password Assistance
                            </p>
                        </td>
                    </tr>

                    <!-- Card Body -->
                    <tr>
                        <td style="padding: 36px 32px 28px 32px; text-align: left;">
                            
                            <!-- Category Badge -->
                            <div style="margin-bottom: 16px;">
                                <span style="display: inline-block; background-color: #fee2e2; color: #DC2626; font-size: 11px; font-weight: 800; padding: 5px 14px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.8px;">
                                    🔒 Password Reset Request
                                </span>
                            </div>

                            <!-- Greeting -->
                            <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #1e1b4b; line-height: 1.3;">
                                Hello${name ? `, ${name}` : ''},
                            </h2>

                            <!-- Instructions -->
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                                We received a request to reset your password for your <strong>Ashivo</strong> account. Please use the 6-digit OTP code below to verify your identity:
                            </p>

                            <!-- OTP Card Box -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fbfaff; border: 2px dashed #7C3AED; border-radius: 18px; margin-bottom: 24px;">
                                <tr>
                                    <td align="center" style="padding: 24px 16px;">
                                        <div style="font-size: 11px; font-weight: 800; color: #8B5CF6; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                                            Your Password Reset Code
                                        </div>
                                        <div style="font-family: 'Courier New', Courier, monospace; font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #5B21B6; text-shadow: 0 2px 4px rgba(91, 33, 182, 0.1); margin: 6px 0;">
                                            ${otp}
                                        </div>
                                        <div style="display: inline-block; margin-top: 10px; background-color: #fee2e2; color: #B91C1C; font-size: 12px; font-weight: 700; padding: 3px 12px; border-radius: 12px;">
                                            ⏱ Expires in 10 minutes
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Tip Box -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fffbeb; border-radius: 12px; border-left: 4px solid #F59E0B; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 14px 16px;">
                                        <p style="margin: 0; font-size: 12px; color: #92400e; line-height: 1.5;">
                                            <strong>Warning:</strong> If you did not make this request, someone else may be attempting to access your account. Do not share this code with anyone.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                                Need help? Contact Ashivo customer support anytime.
                            </p>
                        </td>
                    </tr>

                    <!-- Card Footer -->
                    <tr>
                        <td align="center" style="background-color: #faf9fe; border-top: 1px solid #f0ecfc; padding: 24px 20px; text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #6D28D9;">
                                Ashivo — Groceries delivered in minutes ⚡
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                                &copy; ${new Date().getFullYear()} Ashivo Inc. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- End Main Email Card Container -->

            </td>
        </tr>
    </table>
</body>
</html>`;
};

export default forgotPasswordTemplate;