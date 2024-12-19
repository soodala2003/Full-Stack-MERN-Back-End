import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema(
  {
    source: {
      id: { type: String },
      name: { type: String }
    },
    author: { type: String },
    title: { type: String },
    description: { type: String },
    url: { type: String },
    urlToImage: { type: String },
    publishedAt: { type: String },
    content: { type: String },
  }, {
    timestamps: true // createdAt, updatedAt
  }
);

export default mongoose.model("Source", sourceSchema);