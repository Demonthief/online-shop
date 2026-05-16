import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config();

const app = express()

app.use(cors({
    origin : origin: process.env.CORS));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)

app.get("/", (req,res) =>{
    res.send("API is Online")
})


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})


