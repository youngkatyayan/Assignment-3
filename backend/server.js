import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'colors'
import db from './utils/db.js'
import userRouter from './routes/userRoute.js'
import morgan from 'morgan'
// configure
dotenv.config()
db


// object
const app = express()



// middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// routes
app.use('/api/v1',userRouter)

app.get('/',(req,res)=>{
    res.status(200).send("<h1>Hello World!</h1>")
})

const PORT=process.env.port || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running at port ${process.env.port}`.bgMagenta.white)
})