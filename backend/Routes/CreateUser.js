const express = require('express')
const router = express.Router()
const User = require('../models/User')


//create User route
router.post("/createuser", async (req, res)=>{
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



