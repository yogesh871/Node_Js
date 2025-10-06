const express =  require("express")
const { userLogin, userRagister, userProfile, updateUser, deleteUser } = require("../../controllers/clients/client.controller")

const clientRouter = express.Router()

clientRouter.post("userRegister", userRagister)
clientRouter.post("userLogin", userLogin)
clientRouter.get("userProfile", userProfile)
clientRouter.put("editUser", updateUser)
clientRouter.delete("deleteUser", deleteUser)

module.exports = clientRouter