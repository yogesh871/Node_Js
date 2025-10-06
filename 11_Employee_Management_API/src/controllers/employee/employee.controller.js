const User = require("../../models/User.model")
const bcrypt =  require("bcrypt")
const path =  require("path")
const fs =  require("fs")
const jwt =  require("jsonwebtoken")

exports.addEmployee =  async (req, res) => {
 try {
    let manager =  req.user

    if(!manager){
       return res.json({status : 400, message : "Only Admin or Manager can add "})
    }
  
    let employee = await User.findOne({email : req.body.email, isDelete: false})

    if(employee){
       return res.json({status :  403 , message : "Employee Alrady Exisist"})
    }
  
    let imagePath = " "
    if(req.file){
      imagePath =  `uploads/employee_profile${req.file.filename}`
    }
  
    let hashPassword =  await bcrypt.hash(req.body.password, 10)
     await User.create({...req.body, profileImg  : imagePath, role : "employee", password : hashPassword})
     return res.json({status : 200, message :  "Add Employee successfully !"})
 } catch (error) {
     console.log(error);
     return res.json({status : 500, message : "Server Error"})
 }
}


exports.employeeLogin =  async (req, res) => {
try {
    
    let employee  =  await User.findOne({email : req.body.email, isDelete : false})

    if(!employee){
        return res.json({status : 404,  message : "Employee Not Found" })
    }

    if(employee.role !== "employee"){
        return res.json({status : 403, message : "Only Employee Login"})
    }

    let comparePassword =  await bcrypt.compare(req.body.password, employee.password)

    if(!comparePassword){
         return res.json({status : 400, message :  "Invalid credentials"})
    }

    let employeeToken = await jwt.sign({userId : employee._id, role :  employee.role}, process.env.SECRET_KEY, {expiresIn : "1d"})
      return res.json({status :  200, message : "Employee Login successfully !", token : employeeToken})
} catch (error) {
      console.log(error);
      return res.json({status : 500, message :  "Server Error"})
}

}


exports.employeeProfile =  async (req, res) => {
    try {
        const employeeId  =  req.params.id ? req.params.id : req.user.id
        const employee =  await User.find({_id : employeeId,  isDelete :  false})
        console.log(employee);

         if(!employee){
            return res.json({status : 404, message : "Employee Not Found"})
         }
         return res.json({status :  200, message : "View Employee Profile", data : employee})
        
    } catch (error) {
        console.log(error);
        return res.json({status : 500, message :  "Server Error"})
    }

}
exports.allEmployees =  async (req, res) => {
     try {
        let employees =  await User.find({role : "employee", isDelete :  false})
        return res.json({status : 200, message :" View All Employees", data : employees})
        
     } catch (error) {
        console.log(error);
        return res.json({status : 500, message : " Server Error"})
        
     }
}


exports.updateEmployee =  async (req, res) => {
try {
    const user = req.user
    const employeeId =  req.params.id
   
    let employee =  await User.findById(employeeId)
    if(!employee) {
       return re.json({status :  404, message : "Employee Not Found"})
    }
   
    if(user.role == "employee" && user._id.toISOString() !== employeeId.toISOString()){
        return res.json({status : 403, message : "Employee can not edit "})
    }
    let imagePath = employee.profileImg;
        if (req.file) {
            let oldImagePath = path.join(__dirname, "../..", imagePath || "");
            if(employee.profileImg && fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath)
            }
            imagePath = `/uploads/employee_profile/${req.file.filename}`;
        }
   
    let updatedData =  {...req.body, profileImg : imagePath,  isDelete : false}
   
    if(updatedData.password) {
        updatedData.password =  await bcrypt.hash(updatedData.password, 12)
    }

    if(user.role == "employee"){
        delete updatedData.role
    }
   
    employee = await User.findByIdAndUpdate(employeeId, updatedData, {new : true})
    
    
    return res.json({status: 200, message : "Employee Updated successfully !", data :  employee })
} catch (error) {
      console.log(error);
      return res.json({status : 500, message :  "Server Error"})
}

}



exports.deleteEmployee =  async (req, res) => {
   try {
    let user = req.user
    const employeeId =  req.params.id

    if(user.role !== "admin" && user.role !== "manager"){
        return  json({status :400 , message : " only Admin or manager can delete"})
    }

    let employee =  await User.findById(employeeId)

    if(!employee){
        return res.json({status :  404, message : "Employee Not Found"})
    }

    employee = await User.findByIdAndUpdate(employeeId,  {isDelete: true })
   return res.json({status : 200, message : "Employee Deleted successfully"})
   } catch (error) {
    console.log(error);
    return res.json({status : 500, message :"erver Error"})
   }

}

