const mongoose =   require("mongoose")

const DB_connection = (req, res) => {
    mongoose.connect("mongodb://localhost:27017/Product_info")
    .then("connection successfully ")
    .catch((err) =>  console.log(err))
}

module.exports = DB_connection;