const User = require("../models/user.model")
const path =  require("path")
const fs = require ("fs")

 

exports.addUserForm =  async(req , res) => {
     res.render("addUserForm")
}
exports.viewAllUser = async (req, res) => {
     try {
         const users = await User.find(); 
         res.render("viewAllUser", { users });
     } catch (err) {
         console.log(err);
         res.status(500).send("Error fetching users");
     }
 };


exports.addUser = async  (req, res) => {
   try {
       const image =  req.file ? '/uploads/'  + req.file.filename : " ";
       await User.create({...req.body, image})
       res.redirect("/users/view-user")
   } catch (error) {
     console.log("Error Adding User", error);
   }
}

exports.deleteUser  =  async (req, res) => {
     try {
        let id =  req.params.id
        let record =  await User.findById(id)

        if(!record) {
            console.log("User Not Found !");
            return res.redirect("/users/view-user")
        }
        else{
           if (record.image) {
            let imagePath =  path.join(__dirname  , ".." , record.image)
                 if(imagePath != " ") {
                    fs.unlinkSync(imagePath)
                 }
            }

            await User.findByIdAndDelete(id)
            console.log("User Deleted Succesfully");
             return res.redirect("/users/view-user")
        }
        
     } catch (error) {
        console.log("User Deleted error " , error);
        return res.redirect("/users/view-user")
        
     }
}

exports.editUserForm =   async (req, res) => {
     try {
        let id =  req.params.id
          const user = await User.findById(id)
        return res.render("edituserForm" , {user})
        
     } catch (error) {
        console.log("Edit User Page Not Found !", error);
        return res.redirect("/users/view-user")
        
     }
}




exports.editUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);

    if (!user) {
      return res.redirect("/users/view-user");
    }

    let imagePath = user.image;

    if (req.file) {
      if (user.image) {
        const oldImagePath = path.join(__dirname, "..", user.image);
        if (oldImagePath != " ") {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagePath = `/uploads/${req.file.filename}`;
    }

    await User.findByIdAndUpdate(
      id, { ...req.body, image: imagePath },{ new: true });

    return res.redirect("/users/view-user");
  } catch (error) {
    return res.redirect("/users/view-user");
  }
};
