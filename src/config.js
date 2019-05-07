// 连接数据库的配置文件，向外暴露一个配置对象

module.exports = {
    // 数据库的连接地址
    url: 'mongodb://localhost:27017',
    // 数据库的名称
    dbname: 'mobile',
    // http 服务器监听的端口
    port: 3000
}