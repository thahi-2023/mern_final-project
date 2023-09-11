const express = require('express')
const router = express.Router()
const User = require('../models/User')

// ... rest of the initial code omitted for simplicity
const { body, validationResult } = require('express-validator');



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

    try{
         await User.create({
            name: req.body.name,
            location: req.body.location,
            email:req.body.email,
            password: req.body.password

        })
       //sending json response 
       res.json({success:true})

    }catch (error){
        console.log(error);
        res.json({success:false})

    }
})

module.exports = router;



