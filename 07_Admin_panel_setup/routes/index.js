const express = require("express");
const { dashboard, sendOtp, loginpage,Blogs, verifyOTP, loginUser, logOut, profile, passwordChangeForm, passwordChange, myBlog,  OTPForm, newPassword, resetPassword } = require("../controllers/index");
const userRrouter = require("./user.route");
const blogRrouter = require("./blog.route");
const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/", loginpage);
router.post("/login-user", loginUser);
router.get("/user-logOut", logOut);
router.get("/user-profile", profile);
router.get("/user-passwordChange",  passwordChangeForm);
router.post("/passwordChange", passwordChange);
router.get("/my-blog/category/:category",myBlog);
router.post("/sendOtp",sendOtp);
router.get("/OTPForm",OTPForm);
router.get("/resetPasswordForm",newPassword);
router.post("/verifyOTP",verifyOTP);
router.post("/resetPassword", resetPassword)

router.use("/users", userRrouter);
router.use("/blogs", blogRrouter);

module.exports = router;
