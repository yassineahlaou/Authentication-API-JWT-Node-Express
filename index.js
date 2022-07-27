import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser"
import authRoutes from './routes/auth.js'

const app = express()
const PORT = 3000


//bodyParser

app.use(express.json())

dotenv.config()

//DB connect

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,}, () => console.log('connected to Database'))


//routes middlewares

app.use('/api/user', authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


