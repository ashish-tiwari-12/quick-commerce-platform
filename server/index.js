import express, { response } from "express";
import detenv from "dotenv";
detenv.config();
import coofkieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/connectDB.js";

import userRoutes from "./routes/user.route.js";


const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(coofkieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy: false
}))
const PORT = process.env.PORT || process.env.FRONTEND_URL
app.get("/", (req, res) => {
    response.json({
        message: "hello world" + PORT
    })
})
app.use("/api/user", userRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running at: http://localhost:${PORT}`);
    })

})


