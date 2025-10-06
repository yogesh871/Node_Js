require('dotenv').config()
const express  =  require("express");
const router = require("./routes/admin");
const port = process.env.PORT;
const  DB_connection =  require("./config/DB_Connection")
const app =  express()


app.use(express.urlencoded())
app.use(express.json())

app.use("/api", router)

app.listen(port , () => {
    DB_connection()
    console.log(`Server Runing on http://localhost:${port}`);
});