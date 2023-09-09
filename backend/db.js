const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://thahiraf2021:Inshirahf2021@sei.qvnn4w4.mongodb.net/gofoodmern?retryWrites=true&w=majority'


//connecting mongoDB
const mongoDB = () => {
   mongoose.connect(mongoURI)
   .then(()=>console.log("connected successfully"))
   
   .catch((err)=>{
      //get data from mongodb
      const fetched_data =  mongoose.connection.db.collection("sample")
   fetched_data.find({}).toArray(function( err, data){
    if (err) console.log(err);
    else console.log();
   })

   })
}
 //await mongoose.connect(mongoURI,()=>{
//console.log("connected")
//})
// const mongoDB =async() =>{
//     await mongoose.connect(mongoURI,{ useNewUrlParser: true }, async(err,result)=>{
//         if(err) console.log("---",err)
//         else{
//     console.log ("connected")
// }
//     })
// }



module.exports = mongoDB;