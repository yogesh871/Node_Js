const express = require("express");
const path = require("path");
const router = require("./routers");
const DB_connection = require("./config/DB_connection");
const port = 8888;

const app = express();

DB_connection();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded()); 
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/", router);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
