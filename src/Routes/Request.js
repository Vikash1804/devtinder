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
                res.status(404).send("Can not send request to yourself")
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

module.exports = {
    RequestRouter
};