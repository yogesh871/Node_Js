const express = require("express");
const server = express();

let students = [
    {
        id : 101,
        name : "vishal bhardwas",
        email : "vishal@gmail.com",
        contact : "12345678910"  
    },
    {
        id : 102,
        name : "pradip Narwal",
        email : "pradip@gmail.com",
        contact : "9465835893"  
    },
    {
        id : 103,
        name : "dharmik bhardwas",
        email : "dharmik@gmail.com",
        contact : "9864573582"  
    },
]; 

// server.use(express.urlencoded());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.set("view engine", "ejs");

server.get('/', (req, res) => {
  res.render('index', { students });
});

server.get('/add_student', (req, res) => {
  res.render('add_student');
});


server.post('/add_student', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.redirect('/');
});

server.get('/delete-student/:id', (req, res) => {
  let id =  req.params.id;
   students  = students.filter(student => student.id  != id) 

  res.redirect('/')
})


server.get('/edit-student/:id', (req, res) => {
  let id =  req.params.id;
  let student =  students.find(student => student.id == id)
  console.log(student);

  res.render('edit_student' , {student, id});
});

server.post('/edit_student/:id', (req, res) => {
  let id = req.params.id;
  let record = students.findIndex(student => student.id == id);
    students[record] = { ...students[record], ...req.body };

  res.redirect("/");
});





server.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
