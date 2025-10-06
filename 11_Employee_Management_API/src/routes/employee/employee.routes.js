const express =  require("express")
const { employeeProfile, employeeLogin, updateEmployee, addEmployee, deleteEmployee, allEmployees } = require("../../controllers/employee/employee.controller")
const { uploadEmployeeImg } = require("../../middleware/multer")
const { verifyToken, verifyRoleToken } = require("../../middleware/jwtToken")

const employeeRouter =  express.Router()

employeeRouter.post("/addEmployee",uploadEmployeeImg.single("profileImg"),verifyToken,  verifyRoleToken("admin", "manager"), addEmployee)
employeeRouter.post("/employeeLogin", employeeLogin)
employeeRouter.get("/employeeProfile/:id", verifyToken ,employeeProfile)
employeeRouter.get("/allEmployees", verifyToken,allEmployees)

employeeRouter.put("/editEmployee/:id", uploadEmployeeImg.single("profileImg"), verifyToken, verifyRoleToken("admin", "manager"), updateEmployee)
employeeRouter.delete("/deleteEmployee/:id", verifyToken, verifyRoleToken("admin", "manager"), deleteEmployee)


module.exports = employeeRouter