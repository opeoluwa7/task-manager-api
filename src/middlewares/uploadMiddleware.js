const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig")

function upload(folderName) {
        const storage = new CloudinaryStorage({
                cloudinary: cloudinary,
                params: (req, file) => {
                        const folderPath = `${folderName.trim()}`;
                        const fileExtension = path.extname(file.originalname).substring(1);
                        const publicId = `${file.filename}-${Date.now()}`;

                        return {
                                folder: folderPath,
                                public_id: publicId,
                                format: fileExtension
                            }
                    }
            });

        return multer({
                storage: storage,
                limits: {
                        fileSize: 5 * 1024 * 1024, // file size less than 5mb
                    }
            })
}
        
