// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.write("Amit Shah ");
//   res.end(); 
// });

// server.listen(8000, () => {
//   console.log("Server started at http://localhost:8000");
// });


const http = require('http')
const fs =  require ('fs')


const server =  http.createServer((req, res) => {

    let fileName = " ";
    switch(req.url) {
        case "/"  :
        fileName = "../index.html";
        break;
        case "/about"  :
        fileName = "../About.html";
        break;
        case "/service"  :
        fileName = "../Services.html";
        break;
        case "/blog"  :
        fileName = "../Blog.html";
        break;
        case "/contact"  :
        fileName = "../contact.html";
        break;
         default :
         fileName = "../Error.html"
        break;

    }

    let data = fs.readFileSync(fileName , 'utf-8');
    res.end(data)
})

server.listen(8000, () => {
  console.log("Server started at http://localhost:8000");
});
