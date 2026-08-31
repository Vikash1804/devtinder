const express = require("express");
const connectDB = require("./config/database");
const app = express();
const AuthRouter = require("./Routes/Auth");
const { ProfileRouter } = require("./Routes/Profile");
const { RequestRouter } = require("./Routes/Request");
const UserRouter = require("./Routes/User");


// use to read the data in json format
app.use(express.json());


// adding all routes from thr routes.js file
app.use("/" , AuthRouter);
app.use("/" , ProfileRouter);
app.use("/" , RequestRouter);
app.use("/" , UserRouter)




//connect to the database and localhost
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




