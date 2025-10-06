const express =  require("express")
const { ManagerLogin, updateManager , managerProfile, deleteManager, allManagers, addManagers} = require("../../controllers/manager/manager.controller")
const { uploadManagerImg } = require("../../middleware/multer")
const {verifyToken,verifyRoleToken } = require("../../middleware/jwtToken")

const managerRouter =  express.Router()

//  All Task Done !
managerRouter.post("/addManagers",verifyToken, uploadManagerImg.single("profileImg"),verifyRoleToken("admin"), addManagers)
managerRouter.post("/managerLogin", ManagerLogin)  

managerRouter.put("/editManager/:id",uploadManagerImg.single("profileImg"), verifyToken,verifyRoleToken("admin", "manager"), updateManager)
managerRouter.get("/managerProfile/:id",verifyToken,managerProfile)
managerRouter.delete("/deleteManager/:id",verifyToken,verifyRoleToken("admin"), deleteManager)
managerRouter.get("/allManagers" ,verifyToken, allManagers)

module.exports = managerRouter