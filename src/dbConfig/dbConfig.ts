import { error } from "console";
import mongoose, { connection } from "mongoose";

export const dbConfig = async() => {
    try {
        mongoose.connect(process.env.MONGO_URL!) //When you add '!' to the last it means that Typescript need not to worry about whether the variable will be avaialble or not.
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
