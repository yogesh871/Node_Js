const express = require("express");
const uploadImg = require("../middleware/multer_user");
const { AddBlogForm, AllBlog, AddBlog, DeleteBlog, EditBlogForm, EditBlog, singleBlog } = require("../controllers/blog.controller");
const blogRouter = express.Router();

blogRouter.get("/add-blog", AddBlogForm);
blogRouter.post("/add-blog", uploadImg.fields([ { name: "image", maxCount: 1 }, { name: "authImage", maxCount: 1 }]), AddBlog);
blogRouter.get("/view-blog/category/:category", AllBlog);
blogRouter.get("/delete-blog/:id", DeleteBlog);
blogRouter.get("/edit-blog/:id",EditBlogForm);
blogRouter.post("/edit-blog/:id", uploadImg.fields([ { name: "image", maxCount: 1 }, { name: "authImage", maxCount: 1 }]),EditBlog);
blogRouter.get("/view-singleBlog/:id", singleBlog);


module.exports = blogRouter;

