const express  = require("express")
const { addUserForm, viewAllUser, addUser, deleteUser, editUserForm, editUser } = require("../controllers/user.controller")
const uploadImg = require("../middleware/multer")
const userRoutes =  express.Router()

userRoutes.get("/add-user", addUserForm)
userRoutes.get("/view-user",viewAllUser)
userRoutes.post("/addUser", uploadImg.single("image"),addUser)
userRoutes.get("/delete-user/:id", deleteUser)
userRoutes.get("/edit-user/:id", editUserForm)
userRoutes.post("/editUser/:id",  uploadImg.single("image"), editUser)

module.exports =  userRoutes
