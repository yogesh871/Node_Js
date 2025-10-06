const User = require("../../models/auth.model");

exports.addUser = async (req, res) => {
    try {
      let user = await User.create(req.body);
      return res.json({ status: 200, message: "User Added Successfully", data: user });
    } catch (error) {
      console.error(error);
      return res.json({ status: 500, message: "Server Error" });
    }
  };
  
exports.getAllUser =  async (req, res) => {
    
    try {
        let users = await User.find({isDelete: false});
     
        return res.json({status: 200, message: "Get All User Details ", data: users});

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: "Server Error"});
    }
}

exports.updateUser =  async (req, res) => {
  try {
    let user =  req.user
    user =  await User.findByIdAndUpdate(user._id, {isDelete : false})
    return res.json({staus : 200, message : "User Updated Successfully", data :user})
    
  } catch (error) {
      console.log(error);
      return res.json({status :500, message : "Server Error"})
  }
}

exports.deleteUser =  async (req, res) => {
    try {
        let user =  req.user
        user = await User.findByIdAndDelete(user._id, {isDelete :  true}, {new : true} );
        return res.json({status: 200, message: "Deleted User Successfully ", data: user});

    } catch (error) {
        console.log(error);
        return res.json({status: 500, message: "Server Error"});
    }
}
