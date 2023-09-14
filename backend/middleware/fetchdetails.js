const jwtSecret = "Haha"
var jwt = require('jsonwebToken')
const fetch= (req, res, next)=>{
   // get the user from the jwt token and add id to req object
   const token = req.header('auth-token');
   if(!token){
       res.status(401).send({error:"Invalid Auth Token"}) 
}
try {
    const data = jwt.verify(token,jwtSecret)
    req.user = data.usernext()
} catch (error){
    res.status(401).send({error:"Invalid Auth TOken"})

}
}
module.export = fetch;