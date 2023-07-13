import { dbConfig } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import {UserModel} from '@/models/userModel'
import bcryptjs from 'bcryptjs'

dbConfig()

export async function POST(request:NextRequest){
    try {
       const reqBody = await request.json()
       const {username,email,password} = reqBody
       console.log(reqBody);
       
    //    Check if the user is already exist
       const user = await UserModel.findOne({email})
       if(user){
        return NextResponse.json({error:"User already exists"},{status: 400})
       }

    //    Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPaswords = await bcryptjs.hash(password, salt)

    const newUser = new UserModel({username,password:hashedPaswords,email})
    const savedUser = await newUser.save()
    console.log(savedUser);

    return NextResponse.json({
        message:'User created successfully',
        success:true,
        savedUser
    })
    } catch (error) {
        return NextResponse.json({ error: error})
    }
}