const express = require("express");
const Product = require("./Model/Product_model");
const upload = require("./Middleware/upload_img");
const DB_connection = require("./Config/mongo_DBconnection");
const path = require("path");
const fs = require("fs");

const server = express();
const port = 8000;

server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use(express.static("public"));
server.use("/Upload", express.static("Upload"));

server.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", { products });
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

server.post("/add-product", upload.single("image"), async (req, res) => {
    const image = req.file ? '/Upload/' + req.file.filename : "";
    await Product.create({ ...req.body, image });
    res.redirect("/");
 
});

server.get("/edit-product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("edit", { products: product });
  
});

server.post("/edit-product/:id", upload.single("image"), async (req, res) => {
    const id = req.params.id;
    let product = await Product.findById(id)
    if(!product) {
      res.redirect("back");
    }
    else{
      let imagePath = "" ;
      if(req.file) {
         if(product != "") {
          imagePath = path.join(__dirname, product.image)
          await fs.unlinkSync(imagePath)
          imagePath = `/Upload/${req.file.filename}`
         }
         else{
          imagePath = `/Upload/${req.file.filename}`
         }
      }else {
    imagePath = product.image
      }
      await Product.findByIdAndUpdate(id, {...req.body, image : imagePath}, {new : true})
      res.redirect("/")
    }
    
  
 
});

server.get("/delete-product/:id", async (req, res) => {
    const id = req.params.id;
    const record = await Product.findById(id);

    if (record.image) {
      const imagePath = path.join(__dirname, record.image);
      if (imagePath != "") {
        fs.unlinkSync(imagePath);
      }
      
    }

    await Product.findByIdAndDelete(id);
    res.redirect("/");

});

server.listen(port, () => {
  DB_connection();
  console.log(`Server running on http://localhost:${port}`);
});
