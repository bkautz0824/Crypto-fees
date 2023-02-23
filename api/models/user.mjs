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
        // maxlength:20
    },
    positions: [{
        coin_id: String,
        quantity: Number,
        avg_price: Number,
    }],
    orderhistory: [{
        coin_id: String,
        created_at: String,
        price: Number,
        action: String,
        quantity: Number,
        status: String
    }],
    
},{timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
}}))


export default User
