const { verifyToken } = require("../utils/jwt.js");
const redis = require("../utils/redis.js")

module.exports = {
    check: async (req, res, next) => {
        try {

        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Auth headers not provided in the request.'
                }
            })
        }

        if (!authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Invalid auth mechanism.'
                }
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Bearer token missing in the authorization headers.'
                }
            })
        }


            try {

            const isBlacklisted = await redis.get(token);

            if (isBlacklisted) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid token"
                })
            }
            } catch (error) {
                return res.status(500).json({
                    error: "Token not blacklisted"
                })
            }


        const user = verifyToken(token);
            
            if (!user) {
                return res.status(403).json({
                    success: false,
                    error: 'Invalid access token provided, please login again.'
                });

            }

            req.user = user;


            next();
        } catch (error) {
            return res.status(403).json({
                success: false,
                error: 'Token verification failed, please login again.'
            });
        }
    }
}
