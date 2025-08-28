const express =  require('express')
const Student =  require('./model/student_model')
const mongoose_connection =  require('./config/mongoose_Config')

const  server =  express()
server.use(express.urlencoded())

server.set('view engine', 'ejs')

server.get("/" , (req, res) => {
    res.render("index")
})

server.post("/add-student", async (req, res) => {
 await Student.create(req.body)
 console.log("creating student succesfully");
 res.redirect('/')
})


server.connect


server.listen(8000, () => {
    mongoose_connection();
    console.log("server running on http://localhost:8000");
})


