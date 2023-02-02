import mongoose from "mongoose";

const User = mongoose.model("User", new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId
    },
    username:{
        type:String,
        required:true,
        minlength:8,
        maxlength:20
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:20
    },
    
},{timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
}}))


export default User
