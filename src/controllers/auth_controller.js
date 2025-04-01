const redis = require("../utils/redis.js")

const { encryptPassword, comparePasswords } = require("../utils/bcrypt.js");
const { generateAccessToken } = require("../utils/jwt.js");
const { authSchema } = require("../utils/joi_validation.js");
const authQueries = require("../config/db/auth_queries.js")

const register = async (req, res, next) => {
    try {
        const { error, value } = authSchema.validate(req.body, {convert: true});
        if (error) return res.status(400).json({ 
            success: false,
            error: error.details[0].message 
        });

        const { email, password, name } = value;

        const existingUser = await authQueries.getUserDetails(email);

        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                error: "This email is already registered" 
            });
        }

        const encryptedPassword = await encryptPassword(password);

        const results = await authQueries.createUser({
            name,
            email,
            encryptedPassword
        });


        const user_id = results.user_id;

        const accessToken = generateAccessToken(email, user_id);

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user: {
                user_id: user_id,
                name,
                email
            },
            token: accessToken
        })

    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { error, value } = authSchema.validate(req.body, {convert: true});
        if (error) return res.status(400).json({ 
            success: false,
            error: error.details[0].message 
        });

        const { email, password } = value;

        const user = await authQueries.getUserDetails(email);

        if (!user) {
            return res.status(404).json({ 
                success: false,
                error: "User not found" 
            })
        }

 
        const storedHashedPassword = user.password;
        const user_id = user.user_id;
        const name = user.name;

        const match = await comparePasswords(password, storedHashedPassword);
        if (!match) {
            return res.status(401).json({ 
                success: false,
                error: "Passwords don\'t match" 
            })
        }
        
        const accessToken = generateAccessToken(email, user_id);

        res.status(200).json({
            success: true,
            message: "User login successful!",
            user: {
                user_id: user_id,
                name,
                email
            },
            token: accessToken
        })

    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const authHeaders = req.headers['authorization'];

        const token = authHeaders.split(' ')[1];
        const expiresIn = 900;
        await redis.setex(token, expiresIn, "blacklisted")

        res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        })

    } catch (error) {
        next(error)
    }
}
module.exports = {
    register,
    login,
    logout
}
