// 完成 mongoodb 的连接，并向外暴露一个连接成功的对象
const mongoose = require('mongoose');
const config = require('../config.js');

// 连接数据库
const db = mongoose.createConnection(config.url, {
    useNewUrlParser: true,
    autoIndex: true
});

// 向外暴露数据库连接对象
module.exports = db;