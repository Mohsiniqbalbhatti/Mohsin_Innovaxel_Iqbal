import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    url :{
        type: String,
        required:true,
    },
    shortCode : {
        type: String,
        required:true,
        unique : true
    },
    createdAt :{
        type: Date,
        default : Date.now()
    },
    updatedAt :{
        type: Date,
        default : Date.now()
    }, 
    accessCount : {
        type: Number,
        default: 0
    }
})


const Url = mongoose.model("Url", UrlSchema) 

export default Url