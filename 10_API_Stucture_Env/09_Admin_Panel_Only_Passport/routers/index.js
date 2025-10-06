const express  = require("express")
const { dashboard, loginPage } = require("../controllers")
const userRoutes = require("./user.routes")
const router =  express.Router()



router.get("/", loginPage)
router.get("/dashboard", dashboard)
router.use("/users", userRoutes)

module.exports = router
