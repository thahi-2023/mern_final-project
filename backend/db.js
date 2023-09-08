const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://thahiraf2021:Inshirahf2021@sei.qvnn4w4.mongodb.net/?retryWrites=true&w=majority'


//connecting mongoDB
const mongoDB = () => {
   mongoose.connect(mongoURI)
   .then(()=>console.log("connected successfully"))
   .catch((err)=>{

   })
}
 //await mongoose.connect(mongoURI,()=>{
//console.log("connected")
//})




module.exports = mongoDB;