const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath =  "../../uploads/";
        
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, //1mb file size limit
  });


module.exports = upload
