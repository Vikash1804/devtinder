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
    res.status(500).send("User is not created" +err.message);
}
});

app.get("/allUsers" , async(req , res)=>{
    
    try {
        const users = await UserModel.find();
        res.send(users);
    }
    catch (err) {
        res.status(500).send("Error in fetching users" + err.message);
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
        res.status(400).send("Error in deleting user" + err.message);
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const updateallowed = [
            "firstName",
            "lastName",
            "age",
            "gender",
            "skills"
        ];

        const updatecheck = Object.keys(data).every((k) =>
            updateallowed.includes(k)
        );

        if (!updatecheck) {
            throw new Error("Can't update the data");
        }

        const updateuser = await UserModel.findByIdAndUpdate(
            userId,
            data,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updateuser) {
            throw new Error("User not found");
        }

        res.send("Updated successfully");
    }
    catch (err) {
        res.status(400).send("Something went wrong: " + err.message);
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




