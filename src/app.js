const express = require("express");

const app = express();


app.use("/get", (req, res) => {
    res.send("hello from get");
});
app.use("/post", (req, res) => {
    res.send("Hello from post");
});
app.use("/", (req, res) => {
    res.send("This is Home page");
});

app.listen(7777, () => {
    console.log("Server is started");
});