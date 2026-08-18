const express = require("express");
const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/User");




connectDB().then(()=>{
    console.log("Database is connected");
app.listen(7777, () => {
    console.log("Server is started");
});
})
.catch((err)=>{
    console.log("Database is not connected");
    console.log(err);
})


app.post("/signUp" , async(req , res)=>{
  // creating instance of user model and passing dummy data to it
    const user = new UserModel({
        firstName : "Rohit",
        lastName : "Sharma",
        emailId : "rohit.sharma@example.com",
        password : "password123",
    });
    
    try {
         await user.save();
     res.send("User is created successfully");
    }
   catch (err) {
    res.status(500).send("User is not created");
}
})


