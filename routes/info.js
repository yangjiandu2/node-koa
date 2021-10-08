const person = require('koa-router')()
const db = require("../mysql/config") //

person.get('/', function (ctx, next) {
  console.log('db', db);
  ctx.body = '新增测试页面!'
})


person.post('/address/add', async (ctx, next) => {
  console.log(db, 'dv==');
  // 接收来自前端的参数
  let { user_id, customer, address, customer_phone } = ctx.request.body
  // sql语句，向test表中插入记录
  let insertAddressSql = `insert into test (user_id, customer, address, customer_phone) values ('${user_id}', '${customer}', '${address}', '${customer_phone}')`;
  let result = await new Promise((resolve, reject) => {
    return db.query(insertAddressSql, (err, data) => {
      if (err) throw err;
      // 将成功信息以及得到的数据data一起返回给前端
      let obj = {
        msg: '成功插入一条收获地址！',
        data: data // 这个data中就含有许多的属性，有兴趣的小伙伴可以打印出来看看，里面的insertId就是新插入的记录的key
      }
      resolve(obj)
    })
  })
  ctx.body = result
})


module.exports = person