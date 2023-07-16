import { dbConfig } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import {UserModel} from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

dbConfig()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;

        //check if the user already exists
        const user = await UserModel.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found"},{status:400})
        }

        //validate the password
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"},{status:400})
        }

        //create token
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        //Now we want to save the token in client's browser cookies
        const response = NextResponse.json({ message:'User login successfully',success:true,user})
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response
    } catch (error) {
        return NextResponse.json({ error: error},{status: 500})
    }
}
