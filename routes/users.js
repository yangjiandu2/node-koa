//Koa2/router/users.js
const Router = require("koa-router")
const controller = require("../controller/userController")
const router = new Router()
router.post("login", "/login", controller.checkLogin)
router.post("login", "/register", controller.registerUser)
module.exports = router