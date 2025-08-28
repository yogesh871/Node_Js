const mongoose = require("mongoose");

const DB_connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://yogeshrd1708:yogesh17RD@cluster0.8rdbura.mongodb.net/Admin_panelData");
    console.log(" MongoDB connected: Admin_panelData database");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
};

module.exports = DB_connection;
