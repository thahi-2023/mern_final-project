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

//show  routes
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))


app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
})