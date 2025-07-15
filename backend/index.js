import express from "express"
const app = express()
app.use(express.json())
const PORT = 5000 || 5001;
app.get("/",(req,res)=>{
    res.status(200).json({
        message : `backend server running on port ${PORT}`
    })
})

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})