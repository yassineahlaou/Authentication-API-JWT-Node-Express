import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser  from 'cookie-parser'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/dash.js'

const app = express()
app.use(cookieParser())
const PORT = 3000


//bodyParser

app.use(express.json())

dotenv.config()

//DB connect

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,}, () => console.log('connected to Database'))


//routes middlewares

app.use('/api/user', authRoutes)
app.use('/api/dashboard', postRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


