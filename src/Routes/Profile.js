 const UserModel = require("../models/User");
 const cookiePraser = require("cookie-parser")
 const jwt = require("jsonwebtoken")
 const express = require("express")
 const app  = express();
 const ProfileRouter = express.Router();
 const {UserAuth} = require("../middleware/Auth")
 const { validateEditProfileData } = require("../utils/Validate");
 
ProfileRouter.use(cookiePraser());
   

 
ProfileRouter.get("/profile/view" , UserAuth , async (req , res)=>{
   
    try{

    const  user = req.user; 
   res.send(user);
    }
    catch (err) {
        res.status(500).send("Error in fetching users : " + err.message);
    }
});
ProfileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


module.exports = {
      ProfileRouter
 }