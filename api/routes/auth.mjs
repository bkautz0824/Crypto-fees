import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import User  from '../models/user.mjs'
import express from 'express'
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    // First use mongoose schema with Joi validator to see if username and
    // password are valid input, not valid matching password
    //  Now find the user by their username
    console.log(req.body.password)
    let user = await User.findOne({ username: req.body.username });
    console.log(user.password)
    if (!user) {
      return res.status(400).send('Incorrect username or password.');
    }
    // Then validate the Credentials in MongoDB match those provided in the request.
    // Will return false if password was not encrypted during creation despite matching.
    // Shall not accept matching unencrpyted password for security reasons.
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(req.body.password,validPassword)
    if (!validPassword) return res.status(400).send('Incorrect username or password(2).');
    // If verified, return a jwt, and user id & username
    const token = jwt.sign({ _id: user._id }, 'secret');
    console.log('this is token' + token)
    // Set tokens to header and return basic user info,
    res.header({ 'x-auth-token': token, 'authorization': `Bearer ${token}` })
      .send(_.assign({ token: token }, _.pick(user, ['_id', 'username', 'positions', 'orderhistory'])));
    // console.log(req.headers)
  });







  export default authRouter