const express =  require("express")
const { addProduct, updateProduct, deleteProduct, viewProduct, viewAllProduct } = require("../../controllers/products/product.controller")

const productRouter =  express.Router()


productRouter.post("/addProduct", addProduct)
productRouter.put("/editProduct", updateProduct)
productRouter.delete("/deleteProduct", deleteProduct)
productRouter.get("/viewProduct", viewProduct)
productRouter.get("/viewAllProduct", viewAllProduct)


module.exports = productRouter