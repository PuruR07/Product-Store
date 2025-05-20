import mongoose from "mongoose";
export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected:', conn.connection.host);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);// Process.exit(1) will terminate the process with a failure code and 0 will terminate the process with a success code
                
    }
}