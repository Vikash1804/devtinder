const express = require("express");
const { UserAuth } = require("./Profile");
const ConnectionRequest = require("../models/ConnectionRequest");
const UserModel = require("../models/User");
const UserRouter = express.Router();




UserRouter.get("/user/requests/recieved",UserAuth , async(req,res)=>{
    try{
    const loggedInUser = req.user
    console.log(loggedInUser)
      
    const connectionRequest = await ConnectionRequest.find({
        receiver  : loggedInUser._id,
        status : "interested"
    }).populate("sender", ["firstName"  , "lastName" , "age"]);

    res.json({
        message : "Data fetch Successfully",
        data : connectionRequest
    })

    }
    catch(err){
        res.status(404).send("ERROR"+err.message);
    }

});

UserRouter.get("/user/allConnection",UserAuth , async(req,res)=>{
    try{
    const loggedInUser = req.user
    console.log(loggedInUser)
      
    const connectionRequest = await ConnectionRequest.find({
       $or : [
        {sender : loggedInUser , status : "accepted"},
        {receiver : loggedInUser , status : "accepted"}
       ]
    }).populate("sender",["firstName", "lastName", "age"])
    .populate("receiver",["firstName", "lastName", "age"]);

   const connections = connectionRequest.map(request => {
            return request.sender._id.toString() === loggedInUser._id.toString()
                ? request.receiver  // If user is sender, return receiver
                : request.sender;   // If user is receiver, return sender
   })

    res.json({
        message : "Data fetch Successfully",
         data : connections
    })

    }
    catch(err){
        res.status(404).send("ERROR"+err.message);
    }

});

UserRouter.get("/user/feed",UserAuth , async(req, res)=>{

    try{
    const loggedInUser = req.user

    const connectionrequest = await ConnectionRequest.find({
        $or:[
            {sender : loggedInUser},
            {receiver : loggedInUser}
        ]
    })

    const hideUser = new Set();
    connectionrequest.forEach(req=>{
        hideUser.add(req.sender.toString())
        hideUser.add(req.receiver.toString())
    });
    const page =  parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit>50 ? 50 : limit;
     const skip = (page - 1) * limit;
    const users = await UserModel.find({
        $and :[
            {_id : {$nin : Array.from(hideUser)}},
            {_id : {$ne : loggedInUser}}
        ]
    }).select("firstName lastName age").skip(skip)
    .limit(limit);

    res.json({

        data :users});
}

catch(err){
    res.status(404).send("ERROR"+err.message)
}
});


module.exports = UserRouter;