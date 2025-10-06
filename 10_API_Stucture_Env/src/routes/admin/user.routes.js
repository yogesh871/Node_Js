const express = require("express");
const { addUser, getAllUser, updateUser, deleteUser } = require("../../controllers/admin/user.controller");
const verifyToken = require("../../middleware/jwtToken");


const userRouter =  express.Router()

userRouter.post("/add-user", verifyToken, addUser)
userRouter.get("/all-user", verifyToken,  getAllUser)
userRouter.put("/update-user", verifyToken,  updateUser)
userRouter.delete("/delete-user", verifyToken,  deleteUser)

module.exports =  userRouter;