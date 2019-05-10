/* eslint-disable no-console */
const db = require('../util/db.js');
const mongoose = require('mongoose');
const PAGE_SIZE = 8;
// 生成商品评论的Schema结构
const GoodsCommentSchema = mongoose.Schema({
    // 一个商品对于多个评论
    godId: Number,
    comments: [{
        // 评论的id号码
        comId: Number,
        // 评论的用户名
        username: String,
        // 评论的日期
        comDate: {
            type: Date,
            default: new Date()
        },
        // 评论的内容
        content: String
    }]
});

// 添加商品的评论
GoodsCommentSchema.statics.addComment = function (godId, comment, callback) {
    this.model('goodscomment').findOne({
        godId
    }, (err, data) => {
        if (err) return console.log(err);
        // 更新评论的id自增
        const commentList = data.comments;
        comment.comId = commentList.length;

        data.comments.push(comment);
        data.save(callback);

    });
};

// 分页查询商品的评论
GoodsCommentSchema.statics.findByPageIdx = function (godId, pageIdx, callback) {
    const limStart = PAGE_SIZE * (pageIdx - 1);
    this.model('goodscomment').findOne({
        godId
    }, {
        comments: {
            $slice: [limStart, limStart + PAGE_SIZE]
        }
    }).exec(callback);
};

// 在数据库连接中注册模型
module.exports = db.model('goodscomment', GoodsCommentSchema);