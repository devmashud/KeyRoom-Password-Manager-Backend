import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import passwordRoutes from "./routes/passwordRoutes.js";



dotenv.config();
connectDB()

const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use("/api/passwords", passwordRoutes)

// test route
app.get("/", (req, res) => {
  res.send("Backend API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});