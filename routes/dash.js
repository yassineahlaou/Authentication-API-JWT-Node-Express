import express from'express';

import {auth} from './verifyToken.js'

import User from '../models/User.js';


export const router = express.Router()


router.get('/', auth,  async (req,res) =>
{
    /*res.send({posts: {
        title: 'first post',
        description: 'hi there friends'
    },})*/
    const userLoggedIn = await User.findById( req.user._id )
    res.send(`Welcome ${userLoggedIn.name} !!`)
})

export default router;