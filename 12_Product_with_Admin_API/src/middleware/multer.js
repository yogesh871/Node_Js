const multer =  require("multer")

const adminStorage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, "src/uploads/admin_profile")
    },

    filename : (req, res, cb) => {
        cb(null, `IMG-${Date.now()}`)
    }
})

const uploadAdminImg = multer({storage : adminStorage})

const userStorage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, "src/uploads/user_profile")
    },

    filename : (req, res, cb) => {
        cb(null, `IMG-${Date.now()}`)
    }
})

const uploadUserImg = multer({storage : userStorage})

module.exports = {uploadAdminImg, uploadUserImg }
