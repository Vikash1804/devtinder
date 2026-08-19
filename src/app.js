const express = require("express");
const connectDB = require("./config/database");
const app = express();
const UserModel = require("./models/User");


app.use(express.json());

app.post("/signUp" , async(req , res)=>{
  // creating instance of user model and passing the data from request body
    const user = new UserModel(req.body); 
    try {
         await user.save();
     res.send("User is created successfully");
    }
   catch (err) {
    res.status(500).send("User is not created");
}
});



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




