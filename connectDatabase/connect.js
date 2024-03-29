import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connected to mongoDB");
      } catch (error) {
        throw error;
      }
 }

 mongoose.connection.on("disconnected",()=>{
      console.log("mongoDB disconnected");
 })
    
mongoose.connection.on("connected",()=>{
      console.log("mongoDB connected");
})


export default connect;