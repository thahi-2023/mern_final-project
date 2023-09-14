const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Order = require('../models/Orders')

// ... rest of the initial code omitted for simplicity
const { body, validationResult } = require('express-validator');


//generate json token 
const jwt = require("jsonwebtoken")
//bcrypt to secure password
const bcrypt = require("bcryptjs");
//secure password store in jwtsecret
const jwtSecret = "MynameisEndtoEndYoutubeChannel$#"

//create User route
router.post("/createuser",[
    //email must be an valid email
    body('email').isEmail(),
    // name must be at least 5 chars long
    body('name').isLength({ min:5}),

    //password must be at least 5 chars lomg
    body('password','Incorrect Password').isLength({ min:5 })
],
 async (req, res)=>{

    //Find the validation error in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    // using bycrypt to secure password
    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt)

    try{
         await User.create({
            name: req.body.name,
            location: req.body.location,
            email:req.body.email,
            password: secPassword

        })
       //sending json response 
      
       .then(user => {
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        success = true
        res.json({ success, authToken })
    })
        .catch(err => {
            console.log(err);
            res.json({ error: "Please enter a unique value." })
        })
} catch (error) {
    console.error(error.message)
}
})

//Authentication a User, No Login Required
   
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})