const mongoose = require("mongoose");
const validator = require("validator")

const UserSchema = new mongoose.Schema(
    {
    firstName : {
        type:String,
        required : true,
        minlength : 4,
        maxlength : 50
    },
    lastName :{
        type : String
    },
    emailId :{
        type:String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Email Is Invalid" + " " +value)
           }
        }
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
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("This Is Not a Strong Password" + " " + value)
            }
        }
    },
    age : {
        type : Number,
        min : 18

    },
    skills :{
        type : [String]

    },
    about :{
       type : String,
    }
} , {
    timestamps : true
});

  const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
