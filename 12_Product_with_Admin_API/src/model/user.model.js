const mongoose = require("mongoose") 

const userSchema =  mongoose.Schema({
    firstname : {
        type :  String
    },
    lastname : {
        type :  String
    },
    email : {
        type :  String
    },
    password : {
        type :  String
    },
    gender : {
        type :  String,
        enum : ["Male", "Female"]
    },
    profileImg : {
        type :  String
    },
    role : {
        type :  String,
        enum : ["admin", "user"],
        default : "user"
    }, 
    contactNo : {
        type : String
    }, 
    isDelete : {
        type : false
    }
})

const User =  mongoose.model("users", userSchema)
module.exports = User