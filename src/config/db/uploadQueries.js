const pool = require("./pool.js");

const uploadImageUrl = async(image_url, user_id) => {
    try {
        const results = pool.query('INSERT INTO images (image_url, user_id) VALUES($1, $2) RETURNING *', [
            image_url,
            user_id
        ]);

        return results.rows[0];
    } catch (error) {
        throw error
    }
}

const getImages = async(user_id) => {
    try {
        const results = pool.query('SELECT image_url FROM images WHERE user_id = $1', [
            user_id
        ]);

        return results.rows
    } catch (error) {
        throw error;
    }
};

module.exports = {
    uploadImageUrl,
    getImages
}
