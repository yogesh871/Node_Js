const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken");
const User = require("../../models/User.model");
const fs = require("fs");
const path = require("path");

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
            imagePath = `/uploads/admin_profile/${req.file.filename}`;
        } 

        let hashPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({ ...req.body, profileImg: imagePath, password: hashPassword })
        return res.json({ status: 200, message: "User Register successfully !" })
    } catch (error) {
        return res.json({ status: 500, message: "Server Error" })
    }
}

exports.AdminLogin = async (req, res) => {
  try {
    let admin = await User.findOne({ email: req.body.email, isDelete: false });

    if (!admin) {
      return res.json({ status: 400, message: "Admin Not Found" });
    }

    if (admin.role !== "admin") {
      return res.json({ status: 403, message: "Only admin login " });
    }

    const comparePassword = await bcrypt.compare(req.body.password, admin.password);

    if (!comparePassword) {
      return res.json({ status: 400, message: "Invalid credentials" });
    }

    let adminToken = jwt.sign({ userId: admin._id, role: admin.role }, process.env.SECRET_KEY,{ expiresIn: "1d" });

    return res.json({status: 200, message: "Admin Login successfully", token: adminToken, });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Server Error" });
  }
};



exports.adminProfile =  async (req, res) => {
      try {
        
       const adminId =  req.params.id ? req.params.id : req.user._id
       let user =  await User.findById({_id : adminId,  isDelete : false})
             return res.json({ status : 200, message  : " Get Admin Profile", data : user})
      } catch (error) {
            console.log(error);
            return res.json({ status : 500, message : "Server Error"}) 
      }
}

exports.allAdminProfile =  async (req, res) => {
      try {
        let  admins =  await User.find({role : "admin", isDelete : false})
             return res.json({ status : 200, message  : " Get All Admin Profile", data : admins})
      } catch (error) {
            console.log(error);
            return res.json({ status : 500, message : "Server Error"}) 
      }
}

exports.editAdminProfile = async (req, res) => {
  try {
    let user = req.user;
    const adminId = req.params.id;

    let admin = await User.findById(adminId);
    if (!admin) {
      return res.json({ status: 404, message: "Admin Not Found !" });
    }

    if (user.role === "manager" && user._id.toString() !== adminId.toString()) {
      return res.json({ status: 403, message: "Manager cannot edit admins!" });
    }

    let imagePath = admin.profileImg;
    if (req.file) {
      const oldImagePath = path.join(__dirname, "../..", imagePath || "");
      if (admin.profileImg && fs.existsSync(oldImagePath)) 
      fs.unlinkSync(oldImagePath);
      imagePath = `/uploads/admin_profile/${req.file.filename}`;
    }

    let updatedData = { ...req.body, profileImg: imagePath, isDelete: false };
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 12);
    }

    admin = await User.findByIdAndUpdate(adminId, updatedData, { new: true });
    return res.json({ status: 200, message: "Admin updated successfully!", data: admin });
  } catch (error) {
    return res.json({ status: 500, message: "Server Error" });
  }
};


exports.deleteAdminProfile = async (req, res) => {
  try {
    let user = req.user;
    const adminId = req.params.id;
    let admin = await User.findById(adminId);
    if (!admin) {
      return res.json({ status: 404, message: "Admin not found" });
    }

    if (user.role === "manager") {
      return res.json({ status: 403, message: "Manager cannot delete admins!" });
    }

    await User.findByIdAndUpdate(adminId, { isDelete: true });
    return res.json({ status: 200, message: "Admin deleted successfully!" });
  } catch (error) {
    return res.json({ status: 500, message: "Server Error" });
  }
};
