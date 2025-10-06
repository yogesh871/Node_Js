const  express =  require("express");
const { userRegister, userLogin } = require("../../controllers/admin/auth.controller");
const uploadImg = require("../../middleware/multer");

const authRouter = express.Router()

authRouter.post("/register", uploadImg.single("profileImage"), userRegister)
authRouter.post("/login", userLogin)

module.exports = authRouter;