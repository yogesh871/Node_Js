const User = require("../../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")

exports.addManagers = async (req, res) => {
    try {
        let admin = req.user

        if (!admin) {
            return res.json({ status: 400, message: "only Admin can Add Only " })
        }
        let manager = await User.findOne({ email: req.body.email, isDelete: false })

        if (manager) {
            return res.json({ status: 400, message: "Manager Alrady Exist !" })
        }

        let imagePath = " "
        if (req.file) {
            imagePath = `/uploads/manager_profile/${req.file.filename}`
        }

        let hashPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({ ...req.body, profileImg: imagePath, role: "manager", password: hashPassword })
        return res.json({ status: 200, message: " Add Manager successfully !" })
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "Server Error" })
    }
}


exports.ManagerLogin = async (req, res) => {
    try {
        let manager = await User.findOne({ email: req.body.email, isDelete: false });

        if (!manager) {
            return res.json({ status: 400, message: "Manager Not Valid" });
        }

        if (manager.role !== "manager") {
            return res.json({ status: 400, message: "Only manager login" });
        }
        const comparePassword = await bcrypt.compare(req.body.password, manager.password);

        if (!comparePassword) {
            return res.json({ status: 400, message: "Invalid credentials" });
        }
        let managerToken = jwt.sign({ userId: manager._id, role: manager.role }, process.env.SECRET_KEY, { expiresIn: "1d" });
        return res.json({ status: 200, message: "Manager Login successfully", token: managerToken });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "Server Error" });
    }
};


exports.managerProfile = async (req, res) => {
    try {
        const managerId =  req.params.id ? req.params.id : req.user.id
        const manager = await User.findOne({ _id: managerId, isDelete: false });

        if (!manager) {
            return res.json({ status: 404, message: "Manager not found" });
        }

        return res.json({ status: 200, message: "View Manager Profile", data: manager });
    } catch (error) {
        return res.json({ status: 500, message: "Server Error" });
    }
};

exports.allManagers = async (req, res) => {
    try {
        const allManagers = await User.find({ role: "manager", isDelete: false });
        return res.json({ status: 200, message: "View All Managers", data: allManagers });
    } catch (error) {
        return res.json({ status: 500, message: "Server Error" });
    }
};


exports.updateManager = async (req, res) => {
    try {
        const user = req.user;
        const managerId = req.params.id ;

        let manager = await User.findById(managerId);
        if (!manager || manager.isDelete) {
            return res.json({ status: 404, message: "Manager Not Found" });
        }

        if (user.role === "manager" && user._id.toString() !== managerId.toString()) {
            return res.json({ status: 403, message: "Manager cannot update other managers!" });
        }

        let imagePath = manager.profileImg;
        if (req.file) {
            let oldImagePath = path.join(__dirname, "../..", imagePath || "");
            if(manager.profileImg && fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath)
            }
            imagePath = `/uploads/manager_profile/${req.file.filename}`;
        }

        let updatedData = { ...req.body, profileImg: imagePath, isDelete: false };

        if (user.role === "manager") delete updatedData.role;

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 12);
        }

        manager = await User.findByIdAndUpdate(managerId, updatedData, { new: true });
        return res.json({ status: 200, message: "Manager updated successfully!", data: manager });
    } catch (error) {
        return res.json({ status: 500, message: "Server Error" });
    }
};

exports.deleteManager = async (req, res) => {
    try {
        const user = req.user;
        const managerId = req.params.id;

        if (user.role !== "admin") {
            return res.json({ status: 403, message: "Only admin can delete managers!" });
        }

        const manager = await User.findById(managerId);
        if (!manager || manager.isDelete) {
            return res.json({ status: 404, message: "Manager Not Found" });
        }

        await User.findByIdAndUpdate(managerId, { isDelete: true });
        return res.json({ status: 200, message: "Manager deleted successfully!" });
    } catch (error) {
        return res.json({ status: 500, message: "Server Error" });
    }
};
