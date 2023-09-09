const express = require('express')
const app = express()
const port = 5000

const mongoDB = require("./db")
mongoDB();

//Route
//Index ROutes
app.get('/', (req, res)=> {
    res.send('Hello!')
})

//middleware


app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
})