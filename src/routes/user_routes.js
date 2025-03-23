const router = require("express").Router();
const rateLimit = require("../common/rate_limiter.js");

const updateLimit = rateLimit(10, 10, "Too many update attempts. Try again in 10 minutes");

const isAuthenticated = require("../middlewares/is_authenticated.js")

const UserController = require("../controllers/user_controller.js");

router.get('/profile', [isAuthenticated.check], UserController.findUser);

router.patch('/update-profile', [isAuthenticated.check], updateLimit, UserController.updateUser);

router.delete('/delete-profile', [isAuthenticated.check], UserController.deleteUser)

module.exports = router