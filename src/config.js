// 连接数据库的配置文件，向外暴露一个配置对象

const host = 'localhost';
const dbname = 'mobile';
const port = 3000;

// const username = 'mobile';
// const password = 'yourpasswd';

// 如果是有密码的登录使用这种方式
// const url = `mongodb://${username}:${password}@${host}:27017/${dbname}`;

// 如果是没有密码的本地测试使用这种方式
const url = `mongodb://${host}:27017/${dbname}`;

module.exports = {
    // 数据库的连接地址
    url,
    // http 服务器监听的端口
    port
};