const UserModel = require("../models/User");
const cookiePraser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const express = require("express")
const app  = express();

app.use(cookiePraser());
  

const UserAuth = async (req , res , next) =>{
    try{
    const token = req.cookies.token
    if(!token) {
        throw new Error("Token is not valid Please Login")
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
    res.status(400).send("ERROR!!: "+err.message);

}
};

module.exports = {
    UserAuth
}