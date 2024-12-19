import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
export default mongoose.model("User", userSchema);