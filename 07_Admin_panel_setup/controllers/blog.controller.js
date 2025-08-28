const Blog = require("../models/blog.model"); 
const fs = require("fs");
const path = require("path");
const User = require("../models/user.model");

exports.AddBlogForm  =  async  (req , res) => {

  try {
    if(req.cookies.admin == undefined|| req.cookies.admin._id == undefined){
       return res.redirect("/")
    }
    else{
     const users = await User.find();
     let user =  await User.findById(req.cookies.admin._id )
      return res.render("addblog", {users, user})
    }
    
 } catch (error) {
    console.log("page not Found");
    res.redirect("/")``
 }
}



exports.AllBlog = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect("/");
    }

    let user = await User.findById(req.cookies.admin._id);
    if (!user) {
      return res.redirect("/");
    }

    const users = await User.find();

    const category = req.params.category || "all";
    let blogs;
    if (category === "all") {
      blogs = await Blog.find().sort({ pubDate: -1 });
    } else {
      blogs = await Blog.find({ category: category }).sort({ pubDate: -1 });
    }

    return res.render("blog_data", { users, user, blogs,category, 
    });
  } catch (error) {
    console.log("Error in AllBlog:", error);
    res.redirect("/");
  }
};


exports.AddBlog = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect("/");
    }

    const user = await User.findById(req.cookies.admin._id);
    if (!user) {
      return res.redirect("/");
    }

    let AuthImg = "";
    let AuthName = "";

    if (user) {
      AuthImg = user.image || ""; 
      AuthName = user.firstname + " " + user.lastname; 
    }

    const BlogImg = req.files && req.files.image
      ? "/uploads/" + req.files.image[0].filename
      : "";

    await Blog.create({
      ...req.body,
      image: BlogImg,
      authImage: AuthImg,
      authName: AuthName,
      authId  : user._id
    });

    res.redirect("/blogs/view-blog");
  } catch (error) {
    console.log("error", error);
    res.redirect("/blogs/add-blog");
  }
};


  
  exports.EditBlogForm = async (req, res) => {
    try {
      if (!req.cookies.admin || !req.cookies.admin._id) {
        return res.redirect("/");
      } else {
        const users = await User.find();
        let user = await User.findById(req.cookies.admin._id);
        
        const blog = await Blog.findById(req.params.id);
  
  
        return res.render("editblog", { blog, users, user });
      }
    } catch (error) {
      console.log("page not Found", error);
      res.redirect("/");
    }
  };

  exports.EditBlog = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findById(id);
  
      const BlogImg = req.files && req.files.image
        ? "/uploads/" + req.files.image[0].filename
        : blog.image; 
  
  
      if (req.files && req.files.image && blog.image) {
        try {
          const oldPath = path.join(__dirname, "..", blog.image);
          if ((oldPath =! " ")) fs.unlinkSync(oldPath);
        } catch (err) {
          console.log("Failed to delete old blog image:", err.message);
        }
      }
  
      const AuthImg = req.files && req.files.authImage
      ? "/uploads/" + req.files.authImage[0].filename
      : blog.authImage;

      if (req.files && req.files.authImage && blog.authImage) {
        try {
          const oldPath = path.join(__dirname, "..", blog.authImage);
          if (oldPath =! " ") fs.unlinkSync(oldPath);
        } catch (err) {
          console.log("Failed to delete old author image:", err.message);
        }
      }
  
      await Blog.findByIdAndUpdate(
        id, { ...req.body, image: BlogImg, authImage: AuthImg,}, { new: true });
  
      res.redirect("/blogs/view-blog");
    } catch (error) {
      console.error("Error editing blog:", error);
      res.redirect("/blogs/view-blog");
    }
  };
  
  
  

  exports.DeleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const singleBlog = await Blog.findById(id);

    if (!singleBlog) {
      console.error("Blog not found");
      return res.redirect("/blogs/view-blog");
    }
    if (singleBlog.image) {
      const blogImagePath = path.join(__dirname, "..", singleBlog.image);
        fs.unlinkSync(blogImagePath);
    }
    if (singleBlog.authImage) {
      const authImagePath = path.join(__dirname, "..", singleBlog.authImage);
        fs.unlinkSync(authImagePath);
    }

    await Blog.findByIdAndDelete(id);
    res.redirect("/blogs/view-blog");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.redirect("/blogs/view-blog");
  }
};




exports.singleBlog = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect("/");
    }

    const users = await User.find();
    let user = await User.findById(req.cookies.admin._id);

    let id = req.params.id;
    let blog = await Blog.findById(id); 

    if (!blog) {
      return res.redirect("/blogs");
    }

    return res.render("single_blog", { users, user, blog });
  } catch (error) {
    console.log("page not Found", error);
    res.redirect("/");
  }
};

