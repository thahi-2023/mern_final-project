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
// Get logged in User details, Login Required.
router.post('/getlocation', async (req, res) => {
    try {
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        console.log(lat, long)
        let location = await axios
            .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
            .then(async res => {
                // console.log(`statusCode: ${res.status}`)
                console.log(res.data.results)
                // let response = stringify(res)
                // response = await JSON.parse(response)
                let response = res.data.results[0].components;
                console.log(response)
                let { village, county, state_district, state, postcode } = response
                return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
            })
            .catch(error => {
                console.error(error)
            })
        res.send({ location })
    }
)
router.post ('/foodData', async(req, res)=>{
    try{
        res.send([global.foodData, global.foodCategory])

    }catch (error){
        console.error(error.message)
        res.send("Server Error")
    }

})
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
