const express = require("express");
const UserModel = require("../models/User");
const { ValidateSignUp } = require("../utils/validate");
const AuthRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


AuthRouter.post("/signUp" , async(req , res)=>{
  // creating instance of user model and passing the data from request body
     try {  

      ValidateSignUp(req );
       const {firstName , lastName , emailId , password} = req.body;
      const PasswordHash = await bcrypt.hash(password , 10); 
    const user = new UserModel({
        firstName ,
        lastName , 
        emailId ,
        password : PasswordHash

    }); 
   
         await user.save();
     res.send("User is created successfully");
    }
   catch (err) {
    res.status(500).send("User is not created : " +err.message);
}
});

AuthRouter.post("/login" , async(req,res)=>{
    try{
     const { emailId , password} = req.body

     const user =  await UserModel.findOne({emailId});
   if(!user){
    throw new Error("Invalid Infromation")
   }

const checkpassword = await bcrypt.compare(password , user.password);
   if(checkpassword){
   // create a token 
    const token = await jwt.sign({_id : user._id} , "DevTinder1807");
 // Add the token to the cookies
 res.cookie("token" , token);
 // send response back to the user
    res.send("Login Successfully");
   }
   else{
    res.status(400).send("Invalid Infromation");
   }
}
catch (err){
    res.status(400).send("ERROR: " +err.message);
}
});

AuthRouter.post("/logout" , async(req,res)=>{
    res.cookie("token" , null,{
        expries:new Date(Date.now())
    });
    res.send("Logout Sucessfully")
})


module.exports = AuthRouter;