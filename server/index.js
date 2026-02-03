import express, { response } from "express";
import dotenv from "dotenv";
dotenv.config();
import coofkieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import uploadRouter from "./routes/upload.route.js";
import subCategoryRouter from "./routes/subCategory.route.js";
import productRouter from "./routes/product.route.js";


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
    res.json({
        message: "hello world" + PORT
    })
})
app.use("/api/user", userRoutes);
app.use("/api/category",categoryRouter);
app.use("/api/file",uploadRouter);
app.use("/api/subcategory",subCategoryRouter);
app.use("/api/product", productRouter)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running at: http://localhost:${PORT}`);
    })

})


