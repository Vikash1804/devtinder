const express = require("express");
const { UserAuth } = require("./Profile");
const RequestRouter = express.Router();
const ConnectionRequest = require("../models/ConnectionRequest");
const UserModel = require("../models/User");

RequestRouter.post(
    "/request/send/:status/:receiver",
    UserAuth,
    async (req, res) => {
        try {
            const sender = req.user._id;
            const receiver = req.params.receiver;
            const status = req.params.status;

            const connectionRequest = new ConnectionRequest({
                sender,
                receiver,
                status
            });

            const allowedstatus = ["interested" , "ignored"];
            if(!allowedstatus.includes(status)){
                return res.status(400).send("Status is not valid " + status);
            }
            const Userto = await UserModel.findById(receiver);

            if(!Userto){
                return res.status(404).send("User Not found")
            }

            
            if(sender==receiver){
                return res.status(404).send("Can not send request to yourself")
            }
            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [
                    {sender , receiver},
                    {sender : receiver , receiver : sender}
                ]
            });

            if(existingConnectionRequest){
                return res.json({
                    message:"Request Already Sent"
                })
            }
            const data = await connectionRequest.save();

            res.json({
                message: "Connection Sent Successfully",
                data
            });

            
        } 
        catch (err) {
            res.status(400).send("ERROR " + err.message);
        }
    }
);

RequestRouter.post("/request/review/:status/:requestId" , UserAuth , async (req ,res)=>{
    try {
        const loggedInUser = req.user
        const {status , requestId} = req.params
         
       const AllowedStatus = ["accepted" ,"rejected"]
       if(!AllowedStatus.includes(status)){
        return res.status(404).send("Status Not Valid");
       }

       const connectionrequest = await ConnectionRequest.findOne({
        _id : requestId,
        receiver : loggedInUser,
        status : "interested"
       })

       if(!connectionrequest){
        return res.status(404).send("Connection request not found")
       }

       connectionrequest.status = status

       const data = await connectionrequest.save()

       res.send("Connection " + status + " Successfully")

    }
    catch(err){
        res.status(404).send("ERROR " + err.message)
    }
})

module.exports = {
    RequestRouter
};