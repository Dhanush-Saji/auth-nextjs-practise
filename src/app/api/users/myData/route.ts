import { dbConfig } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from '@/models/userModel';

dbConfig()

export async function GET(request:NextRequest){
    try {
        const userID = await getDataFromToken(request)
        const user = await UserModel.findOne({_id: userID}).select("-password")
        return NextResponse.json({message:'user data',data:user})
    } catch (error) {
        return NextResponse.json({ error: error},{status: 500})
    }
}