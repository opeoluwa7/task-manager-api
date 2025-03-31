const router = require("express").Router();

const AuthController = require("../controllers/auth_controller.js");

const rateLimit = require("../common/rate_limiter.js");

const isAuthenticated = require("../middlewares/is_authenticated.js")

const registerLimit = rateLimit(10, 10, "Too many registeration attempts. Try again in 10 minutes.")
const loginLimit = rateLimit(10, 10, "Too many login attempts!. Try again in 10 minutes.");

router.post('/register', registerLimit, AuthController.register);
router.post('/login', loginLimit, AuthController.login);
router.post('/logout', AuthController.logout);

module.exports = router
