const pool = require("./pool.js");


const createUser = async (user) => {
    try {
        const { email, password, name } = user;


        const results = await pool.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING name, email, user_id', [name, email, password]);

        return results.rows[0]
    } catch (error) {
        throw error
    }
}


const getUserDetails = async (email) => {
    try {

        const results = await pool.query('SELECT user_id, email, password FROM users WHERE email = $1', [email]);

        return results.rows[0]
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    getUserDetails
}