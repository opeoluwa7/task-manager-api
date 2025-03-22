const router = require("express").Router();

const AuthController = require("../controllers/auth_controller.js");

const rateLimit = require("../common/rate_limiter.js");

const registerLimit = rateLimit(10, 10, "Too many registeration attempts. Try again later.")
const loginLimit = rateLimit(10, 10, "Too many login attempts!. Try again later.");

router.post('/register', registerLimit, AuthController.register)
router.post('/login', loginLimit, AuthController.login)

module.exports = router