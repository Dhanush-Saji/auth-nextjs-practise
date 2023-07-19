import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
type decodeTokenType = {
    id:any,
    username:string,
    email:string
}
export const getDataFromToken = (request:NextRequest) =>{
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:decodeTokenType = jwt.verify(token,process.env.TOKEN_SECRET!) as decodeTokenType
        return decodedToken.id
    } catch (error) {
        if(error instanceof Error) 
        throw new Error(error.message);
    }
}