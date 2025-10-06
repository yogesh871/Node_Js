const User = require("../../models/auth.model")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")

exports.userRegister = async (req, res) => {
    try {

        console.log(req.body);
        console.log(req.file);
        const user = await User.findOne({ email: req.body.email, isDelete: false })
        if (user) {
            res.json({ status: 400, message: "User Alrady Exist !" })
        }

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({ ...req.body, profileImage: imagePath, password: hashPassword })
        return res.json({ status: 200, message: "User Register successfully !" })
    } catch (error) {
        return res.json({ status: 500, message: "Server Error" })
    }
}

exports.userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, isDelete: false });

        if (!user) {
            return res.json({ status: 401, message: "Not Valid User !" });
        }

        const comaprePassword = await bcrypt.compare(req.body.password, user.password);
        if(comaprePassword){
            let token = jwt.sign({
                userId: user._id,
            }, process.env.SECRET_KEY)
            return res.json({status: 200,message: "User Login Success", token: token})
        }else{
            return res.json({status: 400,message: "Invalid Credential"})
        }

    } catch (error) {
        console.error("Login Error:", error);
        return res.json({ status: 500, message: "Server Error" });
    }
};


