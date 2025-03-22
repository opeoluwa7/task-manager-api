const router = require("express").Router();

const upload = require("../common/uploads.js");

const isAuthenticated = require("../middlewares/is_authenticated.js");

router.post('/upload', [isAuthenticated.check], (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: "File size is too large!, max size is 1mb" })
            }
            return res.status(400).json({error: err.message})
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }


        res.status(201).json({ message: "File uploaded successfully" })
    });
});

module.exports = router