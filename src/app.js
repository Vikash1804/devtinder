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

app.get("/allUsers" , async(req , res)=>{
    
    try {
        const users = await UserModel.find();
        res.send(users);
    }
    catch (err) {
        res.status(500).send("Error in fetching users");
    }
    
});


app.delete("/user", async(req,res)=>{
    const user = req.body;
    const userId = req.body.userId;
    

    try{
        const user = await UserModel.findByIdAndDelete(userId);
        res.send("User is deleted successfully");
    }
    catch(err){
        res.status(400).send("Error in deleting user");
    }
});

app.patch("/user" , async(req , res)=>{
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    try{
        const updateuser =  await UserModel.findByIdAndUpdate(userId , {firstName: firstName});
        res.send("Updated sucessfully");
    }
    catch(err){
        res.status(400).send("Something wnt wrong");
    }
    
})

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




