const multer =  require("multer")

const storage = multer.diskStorage({
      destination : (req, res, cb) => {
         cb(null, "src/uploads")
    },

    filename : (req, res, cb) => {
        cb(null, `IMG-${Date.now()}`)
    }
})

const uploadImg = multer({storage : storage})

module.exports = uploadImg