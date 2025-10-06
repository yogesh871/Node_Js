const mongoose  =  require("mongoose")

const productSchema  =  mongoose.Schema({
    productTitle : {
        type : String
    },
    productDesc : {
        type : String
    },
    productPrice : {
        type : String
    },
    productImg : {
        type : String
    },
    productDiscount : {
        type : String
    },
    ProductPublishingDate : {
        type : String
    },
    productCategory: {
        type : String
    }
})

const Product = mongoose.model("products", productSchema)

module.exports = Product