const express =  require("express")
const { userRegister, adminProfile, editAdminProfile, deleteAdminProfile, allAdminProfile, AdminLogin } = require("../../controllers/admin/auth.controller")
const { verifyToken , verifyRoleToken}= require("../../middleware/jwtToken")
const { uploadAdminImg } = require("../../middleware/multer")

const authRouter = express.Router()

//  All Task Done !
authRouter.post("/register", uploadAdminImg.single("profileImg"), userRegister)
authRouter.post("/login",  AdminLogin)
authRouter.get("/myProfile/:id",verifyToken, adminProfile)
authRouter.put("/editProfile/:id", verifyToken,uploadAdminImg.single("profileImg"), verifyRoleToken("admin"), editAdminProfile)
authRouter.delete("/deleteProfile/:id", verifyToken, verifyRoleToken("admin"),deleteAdminProfile)
authRouter.get("/allAdminProfile",verifyToken, allAdminProfile), 

module.exports =  authRouter