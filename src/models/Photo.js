/**
 * 创建一个 Photo 图片对象的 Schema 对象
 */
const db = require('../util/db.js')
const mongoose = require('mongoose')

// 创建 Schema 对象
const PhotoSchema = mongoose.Schema({
    // 图片分享的id号码
    phoId: Number,

    // 多个图片的 url地址
    phos: [String],

    // 图片的介绍
    intro: String
})

// 在数据库连接对象中注册这个 模型, 并向外导出这个 Model
module.exports = db.model('photo', PhotoSchema);