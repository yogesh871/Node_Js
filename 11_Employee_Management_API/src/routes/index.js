const express =  require("express")
const authRouter =  require("./admin/auth.routes")
const managerRouter = require("./manager/manager.routes")
const employeeRouter = require("./employee/employee.routes")

const router =  express.Router()

router.use("/admin", authRouter)
router.use("/manager", managerRouter)
router.use("/employee", employeeRouter)

module.exports =  router