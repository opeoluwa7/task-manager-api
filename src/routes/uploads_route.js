const router = require("express").Router();
const fs = require("fs");
const path = require("path")
const uploadQueries = require("../config/db/uploadQueries.js");
const upload = require("../common/uploads.js");
const uploadDir = path.join(__dirname, '../../uploads')

const isAuthenticated = require("../middlewares/is_authenticated.js");

router.post('/upload', [isAuthenticated.check], (req, res, next) => {
   try {
   upload.single("image")(req, res, async (err) => {
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
                    error: "No image uploaded"
            })
        }

        const fileUrl = `upload/${file.filename}`

        const user_id = req.user.user_id;

        if (!user_id) return res.status(401).json({
                success: false,
                error: "No Auth Headers found. please log in again."
            })

        const result = await uploadQueries.uploadImageUrl(fileUrl, user_id)


        res.status(201).json({ 
                success: true,
                message: "File uploaded successfully",
                image: result
        })
    });  
   } catch (error) {
   next(error) 
   } 
});

router.get('/upload', [isAuthenticated.check], (req, res, next) => {
    try {
       fs.readdir(uploadDir, async (err, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                success: false,
                error: "Failed to read uploads directory"
            });
        }

            const user_id = req.user.user_id;

            if (!user_id) return res.status(401).json({
                success: false,
                error: "No Auth Headers found. please log in again."
            })

            const result = await uploadQueries.getImages(user_id);

            if (!result) return res.status(404).json({
                success: false,
                error: "No images found"
            })

            res.status(200).json({
                success: true,
                message: "All images",
                images: result
            });
        }) 
    } catch (error) {
        next(error)
    }
})

module.exports = router
