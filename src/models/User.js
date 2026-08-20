const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
    firstName : {
        type:String,
        required : true
    },
    lastName :{
        type : String
    },
    emailId :{
        type:String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true
    },
      gender:{
        type:String, 
        validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender is not valid")
        }

        },
        
    },
    password:{
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 18

    },
    skills :{
        type : [String]

    }
} , {
    timestamps : true
});

  const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
