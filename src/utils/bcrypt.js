const bcrypt = require("bcrypt");

exports.encryptPassword = async (password) => {
    try {
        const salt = 10;
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error
    }
}

exports.comparePasswords = async (inputPassword, storedHashedPassword) => {
    try {
        const match = await bcrypt.compare(inputPassword, storedHashedPassword);
        return match;
    } catch (error) {
        console.error("Passwords don\'t match:", error);
        throw error
    }
}

