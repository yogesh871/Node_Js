const mongoose =  require("mongoose")

const userSchema =  mongoose.Schema ({
    firstname : {
        type  :  String
    }, 
    lastname : {
        type  :  String
    }, 
    email : {
        type  :  String
    }, 
    password : {
        type  :  String
    }, 
    contact : {
        type  :  String
    }, 
    image : {
        type  :  String
    }, 
    gender : {  
        type: String,
        enum: ["Male", "Female"]
    }, 
    hobbies : {
        type : Array
    }
})

const User  =  mongoose.model("Users", userSchema)

module.exports  =  User