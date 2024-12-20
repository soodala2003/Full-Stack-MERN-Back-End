import express from "express";
import dotenv from "dotenv";
import db from "./db/conn.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//import Technology from "./models/Technology.js";
import userRoutes from "./routes/user.route.js";
import sourceRoutes from "./routes/source.route.js";
import technologyRoutes from "./routes/technology.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions ={
  origin: "https://full-stack-mern-app-back-end.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); 
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const locals = {
    title: "Full Stack MERN App Deployment",
    description: "Build and deploy the back-end of a full-stack MERN application."
  };

  res.send("Full Stact MERN App Back-End Deployment")
}); 

/* app.get("/api/users/create", (req, res) => {
    res.render("user_create");
}); */

/* app.get("/api/sources/create", (req, res) => {
    res.render("source_create");
}); */

app.use("/api/sources", sourceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/technologies", technologyRoutes);
//console.log(process.env.ATLAS_URI);

app.listen(PORT, () => {
  db();
  console.log(`Server is running on port: ${PORT}`);
});