const mongoose = require('mongoose');
const mongoURI ='mongodb+srv://thahiraf2021:Inshirahf2021@sei.qvnn4w4.mongodb.net/gofoodmern?retryWrites=true&w=majority'

//mongodb+srv://thahiraf2021:<password>@sei.qvnn4w4.mongodb.net/?retryWrites=true&w=majority

//connecting mongoDB
 const mongoDB =  () => {
    mongoose.connect(mongoURI)
    .then(()=>console.log("connected successfully"))
   
    .catch((err)=>{
     // get data from mongodb
     const fetched_data =  mongoose.connection.db.collection("food_items")
      fetched_data.find({}).toArray( async function( err, data){
        const foodCategory =   await mongoose.connection.db.collection("foodCategory")
        foodCategory.find({}).toArray(function(err, catData) {
           if (err) console.log(err);
        else {
          global.food_items = data;
          global.foodCategory = catData;
          //console.log(global.food_items)
        }
      })
         })
       })
        }
     

   

 

// const mongoDB =async() =>{
//     await mongoose.connect(mongoURI,{ useNewUrlParser: true }, async(err,result)=>{
//         if(err) console.log("---",err)
//         else{
//     console.log ("connected")
// const fetched_data =  await mongoose.connection.db.collection("user")
// fetched_data.find({}).toArray(function( err, data){
//  if (err) console.log(err);
// else{
//    console.log();
// }
// })
// }
//     })
//  }



module.exports = mongoDB;