const mongoose =  require("mongoose")

const ProductSchema =  new mongoose.Schema({
 productTitle :  {
   type :  String
 },
 productDesc :  {
   type :  String
 },
 productPrice :  {
   type :  String
 },
 productImage :  {
   type :  String
 },
 categoryName :  {
    type : mongoose.Schema.Types.ObjectId,
    ref : "category"
}, 
subCategoryName : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "subCategory"
},
extraCategoryName : {
    type  : mongoose.Schema.Types.ObjectId,
    ref : "extraCategory"
}

})

const Product = mongoose.model("Product" ,  ProductSchema)
module.exports =  Product;