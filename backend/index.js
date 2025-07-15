import express from "express"
const app = express()
app.use(express.json())
import { configDotenv } from "dotenv";
configDotenv()
import ConnectDB from "./connectDB.js";
ConnectDB() // connect to database
const PORT = process.env.PORT || 5001;
app.get("/",(req,res)=>{
    res.status(200).json({
        message : `backend server running on port ${PORT}`
    })
})

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})