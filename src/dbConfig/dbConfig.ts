import { error } from "console";
import mongoose, { connection } from "mongoose";

export const dbConfig = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB connection established')
        })
        connection.on('error',()=>{
            console.log('MongoDB connection error',error)
            process.exit()
        })
    } catch (error) {
        console.log('Something goes wrong')
        if(error instanceof Error) console.log(error.message)
    }
}
