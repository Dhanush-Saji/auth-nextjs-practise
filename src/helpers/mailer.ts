import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { UserModel } from '@/models/userModel'

export const sendEmail = async({email,emailType,userId}:any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === 'VERIFY'){
            await UserModel.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }else if(emailType === 'RESET'){
            await UserModel.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e4380711c100e3",
              pass: "b2ba8b8e7e19cb"
            }
          });
          const mailOptions={
            from:'dhanusaji@gmail.com',
            to:email,
            subject:emailType === 'VERIFY'?'Verify you email':"Reset your password",
            html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}" >here</a>
            to ${emailType == "VERIFY"?"Verify your email":"Reset your password"}</p>`
          }
          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}