import express from'express';

import User from '../models/User.js';
import {auth} from './verifyToken.js'


import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'



import { registrationValidation , loginValidation} from '../validation.js';


//validation


const router = express.Router()


router.post('/register', async (req, res) => {

    //data validation
    const {error} = registrationValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}

    //check if user is already in database

    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) {return res.status(400).send('This email already exists!')}

    //hash the password

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,

    })

    //save user
    try {
        const savedUser = await user.save()
        res.send(savedUser)
        //res.send({user: user._id})
        
    } catch (error) {
        res.status(400).send(error)
  
    }
})

//login

router.post('/login', async (req, res) => {

    //data validation
    const {error} = loginValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}

    //check if user is already in database

    const userLog = await User.findOne({email: req.body.email})
    if (!userLog) {return res.status(400).send(' email not found!')}

    //check if password is correct 
    const passwordMatched = await bcrypt.compare(req.body.password, userLog.password)
    if (!passwordMatched){return res.status(400).send(' passwored don\'t match')}
    

    //create token jwt , as a security mesure that the user is logged in

    const token = jwt.sign({_id: userLog._id}, process.env.TOKEN_SECRET)
    res.cookie('authtoken', token).send(token)
    

})

router.get('/signout',  auth,  async (req,res) =>
{
    
    console.log('Cookies: ', req.cookies)
    const userLoggedIn = await User.findById( req.user._id )
    
    res.clearCookie('authtoken')
    res.send(`GoodBye ${userLoggedIn.name} !!`)
    
   
    
})





export default router;