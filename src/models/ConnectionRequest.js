const { default: mongoose } = require("mongoose");



const connectionRequestSchema = new mongoose.Schema({
    sender:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,

    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        required : true 
    },
    status :{
        type : String ,
        required : true,
        enum:{
            values:["ignored" , "accepted","interested" ,"rejected"],
            message : `{VALUE} is not a valid status`
        },
    },   
} , 

{
    timestamps : true,
}

);

connectionRequestSchema.index({sender : 1 , receiver :1});


const connectionRequest = mongoose.model("connectionRequest" , connectionRequestSchema)

module.exports =   connectionRequest;

