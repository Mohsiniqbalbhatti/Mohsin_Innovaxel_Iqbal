import mongoose from "mongoose";
const ConnectDB = async ()=>{
    try {
        const URI = process.env.DBURL
        await mongoose.connect(URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error Connecting DB", error)
    }
}


export default ConnectDB