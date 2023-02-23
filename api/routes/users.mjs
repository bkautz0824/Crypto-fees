import express from 'express';
import User from '../models/user.mjs';
import mongoose from 'mongoose';

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


const addToHoldings = async(req, res) => {
    let user
    let coin = {
        coin_id: req.body.coin_id,
        quantity: req.body.quantity,
        avg_price: req.body.price
    }
    let order = {
        coin_id: req.body.coin_id,
        created_at: req.body.date,
        price: req.body.price,
        action: req.body.action,
        quantity: req.body.quantity,
        status: req.body.status
    }
    try{
        await User.findOne({ _id: req.body.user_id}).then((res) => user = res).catch((err) => console.log(err))
        //find user 
        // console.log(user)

        if(!user) return res.status(404).send("User could not be found")

        const positionIndex = user.positions.findIndex(item => item.coin_id === (req.body.coin_id))

        if(positionIndex >= 0){
            let item = user.positions.splice(positionIndex, 1)
            // console.log(item[0])
            let quantity = item[0].quantity + req.body.quantity
            let avgPrice = (item[0].avg_price + req.body.avg_price) / quantity
            // console.log(quantity, avgPrice)
            user.positions.push({
                coin_id: user.coin_id,
                quantity: quantity,
                avg_price: avgPrice
            })
        }

        console.log(user.positions)


        // user.positions.push(coin)
        // user.orderhistory.push(order)
        // //add new coin to positions and orderhistory
        // await user.save()
        // return res.send(user)
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

        const orderIndex = user.orderhistory.findIndex(item => item.coin_id === (req.body.coin_id))
        console.log(positionIndex, orderIndex)

        if(positionIndex === -1 || orderIndex === -1) return res.status(404).send("Coin is not found in positions")
        user.positions.splice(positionIndex, 1)

        user.orderhistory.splice(orderIndex, 1)

        console.log(user)
        await user.save()
        return res.send(user)
    }
    catch(err){
        return res.status(400).send(err)
    }
}


userRouter.post('/remove-coin', removeHolding)



export default userRouter;