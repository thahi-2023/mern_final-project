const express = require('express')
const router = express.Router()
const User = require('../models/User')


//create User route
router.post("/createuser", async (req, res)=>{
    try{
         await User.create({
            name: "James",
            location: "Wall Street",
            email:"james123 @ gmail.com",
            password: "123456"

        })
       //sending json response 
       res.json({success:true})

    }catch (error){
        console.log(error);
        res.json({success:false})

    }
})



