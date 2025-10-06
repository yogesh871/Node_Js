const express = require("express")
const { adminRegister, adminLogin } = require("../../controllers/admin/auth.controller")
const { uploadAdminImg } = require("../../middleware/multer")

const authRouter =  express.Router()

authRouter.post("/adminRegister",uploadAdminImg.single("profileImg"), adminRegister)
authRouter.post("/adminLogin", adminLogin)
authRouter.get("/adminProfile", adminProfile)
authRouter.put("/editAdmin", updateAdmin)
authRouter.delete("/deleteAdmin", deleteAdmin)

module.exports =  authRouter