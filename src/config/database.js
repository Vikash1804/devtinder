const mongoose = require('mongoose');

const connectDB = async () =>{
     await mongoose.connect("mongodb+srv://vikkyvikash8765s10_db_user:aaDpgcuQLgOoX5gw@nodejscourse.do3px1f.mongodb.net/DevTinder")
};

module.exports = connectDB;