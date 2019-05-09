/* eslint-disable no-console */
/**
 * 定义图片评论的对象的 Schema 对象
 */
const db = require('../util/db.js');
const mongoose = require('mongoose');

// 定义一页查询八张图片信息
const PAGE_SIZE = 8;

const PhotoCommentSchema = mongoose.Schema({
    // 一个photi对应一组评论
    phoId: Number,
    comments: [{
        // 评论id
        comId: Number,
        // 用户名
        username: {
            type: String,
            default: '匿名'
        },
        // 评论日期
        comDate: {
            type: Date,
            default: new Date()
        },
        // 评论的内容
        content: String
    }]
});

// 通过 phoId 查询一组评论的方法
PhotoCommentSchema.statics.findByPhoId = function (phoId, callback) {
    this.model('photocomment').find({
        phoId: phoId
    }, callback);
};

// 通过图片 id 分页查询图片评论
PhotoCommentSchema.statics.findByPageIdx = function (id, pageIdx, callback) {
    const limStart = PAGE_SIZE * (pageIdx - 1);
    this.model('photocomment').findOne({
        phoId: id
    }, {
        comments: {
            $slice: [limStart, limStart + PAGE_SIZE]
        }
    }).exec(callback);
};

// 添加评论的方法
PhotoCommentSchema.statics.addComment = function (phoId, comment, callback) {
    // 通过 phoId 查找到这个 图片分享，然后添加一个评论
    this.model('photocomment').findOne({
        phoId: phoId
    }, (err, data) => {
        if (err) return console.log(err);
        // 更新评论的id自增
        comment.comId = data.comments.length;

        data.comments.push(comment);
        // 保存修改之后的内容
        data.save(callback);
    });
};

// 通过 Schema 注册一个 Model
module.exports = db.model('photocomment', PhotoCommentSchema);