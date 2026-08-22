const validator = require('validator');
const ValidateSignUp  = (req )=>{

    const {firstName , lastName , emailId , password} = req.body;
    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Enter Your full deatils");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Plaese Enter a valid EmailId");
    }
    else if(!validator.isStrongPassword(password)){
        throw n=new Error("Please enter a strong Password");
    }



}

module.exports = 
{ValidateSignUp
};