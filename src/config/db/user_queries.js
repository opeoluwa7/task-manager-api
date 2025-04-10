const pool = require("./pool.js");


const getUserAfterAuth = async (user_id) => {
    try {
        const results = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);


        return results.rows[0]
    } catch (error) {
        throw error
    }
}

const updateUser = async (newName, newEmail, encryptedPassword, user_id) => {
    try {
        const results = await pool.query('UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password) WHERE user_id = $4 RETURNING *', [newName, newEmail, encryptedPassword, user_id]);

        return results.rows[0]
    } catch (error) {
        throw error;
    }
}

const deleteUser = async(user_id) => {
    try {
        const results = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id])

        return results.rows
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUserAfterAuth,
    updateUser,
    deleteUser
}