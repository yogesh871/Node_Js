const mongoose =  require('mongoose')

const studentSchema =  mongoose.Schema( {
    firstname : String, 
    lastname : {
        type : String
    }, 
    age : {
        type : Number
    }, 
    email : {
        type : String
    },
    contact :  {
        type :  Number
    } ,
    gender : {
        type : String, 
        enum : ['Male' , 'Female']
    }

}

)

const Student =  mongoose.model('Students ' , studentSchema)

module.exports =  Student;