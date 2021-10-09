//Koa2/controller/userController.js
const user = require("../server/user")


async function checkLogin(ctx, next) {
  let { email, password } = ctx.request.body
  let data = await user.checkUser(email, password)
  return ctx.response.body = data
}

async function registerUser(ctx, next) {
  let { email, password } = ctx.request.body
  let data = await user.findUser(email, password)
  return ctx.response.body = data
}


module.exports = {
  checkLogin,
  registerUser
}