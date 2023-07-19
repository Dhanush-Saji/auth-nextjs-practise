import { NextRequest,NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({message:'logout successfully',success:true})
        response.cookies.set('token',"",{httpOnly:true})
        return response
    } catch (error) {
        return NextResponse.json({ error: error},{status: 500})
    }
}