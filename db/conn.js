import mongoose from "mongoose";

const connectionString = "mongodb+srv://soodala78:1972And78@mongopractice.g7ss4.mongodb.net/NewsAPI";

const db = async () => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
    //Process code: 1 means exit with failure, 0 means success   
  }
};

export default db;