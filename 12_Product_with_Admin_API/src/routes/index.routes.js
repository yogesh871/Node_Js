const express =  require("express")

const router = express.Router()

router.use("/admin", authRouter)
router.use("/user", clientRouter)
router.use("/product", clientRouter)

module.exports =  router