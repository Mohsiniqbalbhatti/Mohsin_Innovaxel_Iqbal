import express from "express"
const app = express()
app.use(express.json())
import { configDotenv } from "dotenv";
configDotenv()
import ConnectDB from "./connectDB.js";
ConnectDB() // connect to database
import uniqueSlug from "unique-slug";
import Url from "./urlSchema.js";

const PORT = process.env.PORT || 5001;
app.get("/",(req,res)=>{
    res.status(200).json({
        message : `backend server running on port ${PORT}`
    })
})

// Create a new short URL using the POST method
app.post("/shorten", async (req,res)=>{
    try {
        const {url} = req.body
        if (!url) {
            res.status(400).json({message:"URL is Required"})
        }
        let slug  = uniqueSlug()
        let slugExist = await Url.findOne({shortCode:slug})
        while(slugExist){
            slug  = uniqueSlug()
            slugExist = await Url.findOne({shortCode:slug})        
        }
        const newUrl = Url({
            url : url,
            shortCode : slug,
        })
        await newUrl.save()
        res.status(200).json({
            id: newUrl._id,
            url: newUrl.url,
            shortCode : newUrl.shortCode,
            createdAt: newUrl.createdAt,
            updatedAt: newUrl.updatedAt,
        });
    } catch (error) {
        console.log("Error creating short Url Code", error)
        res.status(500).json({message:"Internal Server Error"})
    }
})



app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})