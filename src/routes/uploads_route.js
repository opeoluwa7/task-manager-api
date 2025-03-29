const router = require("express").Router();
const uploadQueries = require("../config/db/uploadQueries.js");
const { uploadMiddleware } = require("../middlewares/uploadMiddleware.js");
const upload = uploadMiddleware("uploads");
const isAuthenticated = require("../middlewares/is_authenticated.js");

router.post('/upload', [isAuthenticated.check, upload.single("image")], async (req, res, next) => {
   try {
        const file = req.file; // image gotten from post request
            
        if (!file) {
            return res.status(400).json({
                    success: false,
                    error: "No image uploaded"
            })
        }

        const fileUrl = file.path

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
   } catch (error) {
   next(error) 
   } 
});

router.get('/upload', [isAuthenticated.check], async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    }
})

module.exports = router
