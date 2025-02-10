import mongoose from "mongoose";

export async function connect() {
  const MONGODB_URI=process.env.MONGODB_URI
  try {
    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable in .env.local');
    }
    mongoose.connect(MONGODB_URI)

    const connection= mongoose.connection
    connection.on('connected', ()=>{
      console.log('connected');

    connection.on('error',(err)=>{
      console.log("MongoDB connection error, make sure MongoDB is runnign ", err);
    })

    })
  } catch (error) {
    console.log('error occured in db ',error);
    process.exit()
  }

}