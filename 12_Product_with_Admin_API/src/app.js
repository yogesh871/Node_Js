require("dotenv").config()
const express =  require("express")
const port =  process.env.PORT
const DB_connection =  require("./config/DB_connection")
const router = require("./routes/index.routes")

const app  = express()

app.use(express.urlencoded())
app.use(express.json())

app.use("/api", router)

app.listen(port ,  () => {
    DB_connection()
    console.log(`server running on http://localhost${port}`);
})
