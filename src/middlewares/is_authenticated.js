const { verifyToken } = require("../utils/jwt.js");
const redisClient = require("redis").createClient();

module.exports = {
    check: (req, res, next) => {
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

        const result = redisClient.get(token);

            if (result) {
                return res.status(401).json({
                    success: false,
                    error: "Token is blacklisted. Login in again!"
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
