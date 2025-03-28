const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath =  path.join(__dirname, "../../uploads");
        console.log("Saving files to:", uploadPath)
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, //1mb file size limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Images only! (jpeg, jpg, png, gif, svg)'), false);
    }
}

module.exports = upload
