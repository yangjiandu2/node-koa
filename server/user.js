//Koa2/service/user.js
const { query } = require('../mysql/pool');

// 校验登陆
async function checkUser(email, password) {
  let sql = `select * from t_register where email = "${email}" and password="${password}"`
  return query(sql).then(res => {
    const { results } = res
    if (results.length == 1 && results[0].email === email && password === password) {
      return { msg: "登陆成功", code: 200 }
    } else {
      return { msg: "登录失败", code: 201 }
    }
  })
}

// 校验用户
async function findUser(email, password) {
  let sql = `select * from t_register where email = "${email}"`
  return query(sql).then(res => {
    const { results } = res
    if (results.length == 0) {
      return registerUser(email, password)
    } else {
      return { msg: "用户已注册", code: 202 }
    }
  })
}

// 注册
async function registerUser(email, password) {
  let sql = `insert into t_register (email,password) values ('${email}','${password}')`
  return query(sql).then(res => {
    const { results } = res
    if (results.affectedRows == 1) {
      return { msg: "注册成功", code: 200 }
    } else {
      return { msg: "注册失败", code: 200 }
    }
  })
}


module.exports = {
  checkUser,
  findUser,
  registerUser
}