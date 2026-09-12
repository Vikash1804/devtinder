const UserModel = require("../models/User");
const cookiePraser = require("cookie-parser")
const jwt = require("jsonwebtoken")


  

const UserAuth = async (req , res , next) =>{
    
    try{
    const token = req.cookies.token
    if(!token) {
        return res.status(401).send("Please Login")
    }

    const validatetoken = await jwt.verify(token , "DevTinder1807");
      const {_id} = validatetoken
    const user = await UserModel.findById(_id);

    if(!user){
        throw new Error("User not found")
    }

    req.user = user;

    next();
}
catch (err){
    res.status(401).send("ERROR!!!!: "+err.message);

}
};

module.exports = {
    UserAuth
}