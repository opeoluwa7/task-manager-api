const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        const uploadDir = path.resolve(__dirname, "../../uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })          
        } 

        cb(null, uploadDir)
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024},
    fileFilter: function(_req, file, cb) {
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
