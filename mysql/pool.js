// Pool.js  里面是创建连接池，并编写查询方法
// 代码如下：

const mysql = require('mysql')
const { connection } = require('./config')

let pools = {};

// 创建连接池
//判断是否存在连接池不用每次都创建
if (Object.keys(pools).length === 0) {
  pools = mysql.createPool(connection);
}

// 查询  
// sql 是sql语句
// values 是sql语句中的具体值
// sql values 可查看官方文档 https://github.com/mysqljs/mysql#performing-queries
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    //初始化连接池
    pools.getConnection((err, connection) => {
      if (err) {
        console.log(err, '数据库连接失败');
      }
      else {
        console.log('数据库连接成功');
        //操作数据库\

        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err);
          } else {
            connection.release();
            resolve({
              status: 200,
              results
            });
          }
        });
      }
    })
  });
}

module.exports = { query };