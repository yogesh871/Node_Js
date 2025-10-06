
const bcrypt =  require("bcrypt")
const User = require("../../model/user.model")

exports.adminRegister = async (req, res) => {
    try {
        const admin = await User.findOne({email : req.body.email, isDelete :  false})

        if(admin) {
        return res.json({status :  400, message : "Admin Alrady Exist"})
        }
 
        let imagePath = " "
        if(req.file){
         imagePath  =  `/uploads/admin_profile/${req.file.filename}`
        }
 
        let hashPassword =  await bcrypt.hash(req.body.password, 12)
        await User.create({...req.body, profileImg : imagePath, password : hashPassword, isDelete : false})
        return res.json({status : 200, message :  "Admin Register Successfully ! "})
 
    } catch (error) {
          console.log(error);
          return res.json({status  : 500, message :  "Server Error"})
    }
}


exports.adminLogin = async (req, res) => {

}

exports.adminProfile =  async (req, res) => {

}

exports.updateAdmin =  async  (req, res) => {

}

exports.deleteAdmin  = async (req, res) => {

}