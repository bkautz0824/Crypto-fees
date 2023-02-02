import express from 'express';
import User from '../models/user.mjs';
import mongoose from 'mongoose';

const userRouter = express.Router()

const getUser = (req, res, next) => {
    console.log('this is the console.log')
    return res.send('this is the res.send');
}

userRouter.get('/get-user', getUser)


const createUser = async (req, res, next) => {
    let user = await User.findOne({$or:[{username:req.body.username}]})
    if(user) return res.status(400).send({message:'User already exists'})
    try{
        user = await new User({
            username:req.body.username,
            password:req.body.password,
            _id:new mongoose.Types.ObjectId()
        })
        await user.save()
        return res.send(user)
    }
    catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

userRouter.post('/create', createUser)

export default userRouter;