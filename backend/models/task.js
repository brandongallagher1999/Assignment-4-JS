const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    Name : {
        required : true,
        type : String
    },
    Priority : {
        required : true,
        type : Number
    },
    Complete : {
        required : true,
        type : Boolean
    }
});


module.exports = taskSchema;