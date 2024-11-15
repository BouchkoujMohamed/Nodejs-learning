const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    telephone: Number,
    age: Number,
    country:String,
    Gender:String,
},{timestamps:true})

const MyData = mongoose.model("MyDataa", UserSchema);
module.exports = MyData;