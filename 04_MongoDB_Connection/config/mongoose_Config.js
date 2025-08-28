const mongoose =  require("mongoose")

const mongoose_connection = () => {
    mongoose.connect('mongodb://localhost:27017/studentsInfo')
    .then(() => console.log("DB connection succesfully"))
    .catch((err) => console.log(err))
}

module.exports = mongoose_connection;