const mongoose =  require("mongoose")

const userSchema = mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    gender : {
        type : String,
        enum : ["Male", "Female"]
    },
    password : {
        type : String
    },
    profileImage : {
        type : String
    },
    isDelete : {
        type : Boolean,
        default : false
    }
})

const User  =  mongoose.model("user", userSchema) 

module.exports = User