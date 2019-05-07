/**
 * 定义图片评论的对象的 Schema 对象
 */
const db = require('../util/db.js')
const mongoose = require('mongoose')

const PhotoCommentSchema = mongoose.Schema({
    // 一个photi对应一组评论
    phoId: Number,
    comments: [{
        // 评论id
        comId: Number,
        // 用户名
        username: String,
        // 评论日期
        comDate: Date,
        // 评论的内容
        content: String
    }]
})

// 通过 phoId 查询一组评论的方法
PhotoCommentSchema.statics.findByPhoId = function(phoId, callback){
    this.model('photocomment').find({phoId: phoId}, callback);
}

// 添加评论的方法
PhotoCommentSchema.statics.addComment = function(phoId, comment, callback){
    // 通过 phoId 查找到这个 图片分享，然后添加一个评论
    this.model('photocomment').update({phoId: phoId}, {$push: {
        comments: comment
    }}, callback);
}

// 通过 Schema 注册一个 Model
module.exports = db.model('photocomment', PhotoCommentSchema);
