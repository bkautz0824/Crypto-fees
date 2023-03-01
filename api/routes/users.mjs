import express from 'express';
import User from '../models/user.mjs';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userRouter = express.Router()

const getUser = (req, res, next) => {
    console.log('this is the console.log')
    return res.send('this is the res.send');
}

userRouter.get('/get-user', getUser)

const getAllUsers = async(req, res) => {
    const users = await User.find({})
    return res.send(users)
}
userRouter.get('/get-all-users', getAllUsers)


const createUser = async (req, res, next) => {
    let user = await User.findOne({$or:[{username:req.body.username}]})
    if(user) return res.status(400).send({message:'User already exists'})
    console.log(req.body)
    try{
        user = await new User({
            username:req.body.username,
            password:req.body.password,
            _id:new mongoose.Types.ObjectId()
            
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        return res.send(user)
    }
    catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

userRouter.post('/create', createUser)


const addToHoldings = async(req, res) => {
    const { avg_price, quantity, created_at, action, coin_id, status, user_id } = req.body
    let user
    let coin = {
        coin_id: coin_id,
        quantity: quantity,
        avg_price: avg_price
    }
    let order = {
        coin_id: coin_id,
        created_at: created_at,
        price: avg_price,
        action: action,
        quantity: quantity,
        status: status
    }
    try{
        await User.findOne({ _id: user_id}).then((res) => user = res).catch((err) => console.log(err))
        //find user 
        if(!user) return res.status(404).send("User could not be found")

        const positionIndex = user.positions.findIndex(item => item.coin_id === (coin_id))

        if(positionIndex >= 0 && action === 'sell'){
                    user.positions[positionIndex].quantity = user.positions[positionIndex].quantity - quantity
                }

        else if(positionIndex >= 0 && action === 'buy'){
            let newAmount = user.positions[positionIndex].quantity + quantity
            let newAvgPrice = ((user.positions[positionIndex].avg_price * user.positions[positionIndex].quantity) + (quantity * avg_price)) / newAmount

            user.positions[positionIndex].quantity = newAmount
            user.positions[positionIndex].avg_price = newAvgPrice
            
        }else if(action === 'buy'){
            user.positions.push(coin)
            
        }
        user.orderhistory.push(order)
        
        //add new coin to positions and orderhistory
        await user.save()
        return res.send(user)
    }
    catch(err){
        return res.status(400).send(err)
    }
}


userRouter.post('/add-coin', addToHoldings)



const removeHolding = async(req, res) => {
    let user
 
    try{
        await User.findOne({ _id: req.body.user_id}).then((res) => user = res).catch((err) => console.log(err))
        console.log(user)

        const positionIndex = user.positions.findIndex(item => item.coin_id === (req.body.coin_id))

        if(positionIndex === -1) return res.status(404).send("Coin is not found in positions")
        user.positions.splice(positionIndex, 1)

        await user.save()
        return res.send(user)
    }
    catch(err){
        return res.status(400).send(err)
    }
}


userRouter.post('/remove-coin', removeHolding)



export default userRouter;