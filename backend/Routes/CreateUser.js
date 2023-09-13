const express = require('express')
const router = express.Router()
const User = require('../models/User')

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
      .then( res.json({success: true}))

    }catch (error){
        console.log(error);
        res.json({success:false})

    }
})


    router.post("/loginuser", [
        body('email').isEmail(),
        body('password','Incorrect Password').isLength({ min:5 }) ],
   
     async (req, res)=>{

         //Find the validation error in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

        let email = req.body.email

        try{
            let userData = await User.findOne({email})
            if (!userData){
                return res.status(400).json({errors: "Try logging with valid credentials"})
            }

            //compare userpassword  with userdata
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            //userData coming from mongoDb
            if ( !pwdCompare){
                return res.status(400).json({errors: "Try logging with valid credentials"})
            }

            //get id from mogodb and store it in user
              const data ={
                user: {
                    id:userData.id
                  }
              }

//authtoken will create differnt data for password every time user login, so it can be stored safe
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken})

            }catch (error){
           console.log(error);
           res.json({success:false})
    
       }
    })
    


module.exports = router;



