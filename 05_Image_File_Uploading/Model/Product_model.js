const mongoose =  require('mongoose')


const productSchema =  mongoose.Schema({

    name : String , 

    desc : {
        type : String
    },
    price : {
        type : Number
    },
    quantity : {
        type : Number
    },
    category : {
        type : String
    },
    image : {
        type : String
    }
})

const  Product =  mongoose.model("products", productSchema)

module.exports = Product