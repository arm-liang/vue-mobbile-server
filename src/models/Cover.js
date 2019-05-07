/**
 * 封面的图片
 */
// 映入数据库连接对象

const db = require('../util/db.js')

const mongoose = require('mongoose')

// 通过 mongoose 创建一个 Schema

const CoverSchema = mongoose.Schema({
    imgs: [String]
})

// 注册 Model
// 并导出这个 Model
module.exports = db.model('cover', CoverSchema);