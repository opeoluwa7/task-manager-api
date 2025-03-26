const router = require("express").Router();
const fs = require("fs");
const path = require("path")

const upload = require("../common/uploads.js");
const uploadDir = path.join(__dirname, '../../uploads')

const isAuthenticated = require("../middlewares/is_authenticated.js");

router.post('/upload', [isAuthenticated.check], (req, res, next) => {
   try {
   upload.single("image")(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                        success: false,
                        error: "File size is too large!, max size is 1mb" 
                })
            }

            return res.status(400).json({
                    success: false,
                    error: err.message
            })
        }
        
        const file = req.file; // image gotten from post request
            
        if (!file) {
            return res.status(400).json({
                    success: false,
                    error: "No file uploaded"
            })
        }


        res.status(201).json({ 
                success: true,
                message: "File uploaded successfully" 
        })
    });  
   } catch (error) {
   next(error) 
   } 
});

router.get('/upload', [isAuthenticated.check], (req, res, next) => {
    try {
       fs.readdir(uploadDir, (err, files) => {
            if (err) return res.status(500).json({
                success: false,
                error: "Failed too read uploads directory"
            });

            const fileUrl = files.map(file => ({
                name: file,
                url: `/uploads/${file}`
            }));

            res.status(200).json({
                success: true,
                images: fileUrl
            });
        }) 
    } catch (error) {
        next(error)
    }
})

module.exports = router
