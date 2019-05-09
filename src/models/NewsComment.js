/* eslint-disable no-console */
/**
 * 创建一个 Comment 评论对象的 Schema 对象
 */
// 引入数据库连接对象
const db = require('../util/db.js');
const mongoose = require('mongoose');

// 一页加载8条评论信息
const PAGE_SIZE = 8;
// 通过 mongoose 创建一个Schema
const NewsCommentScheme = new mongoose.Schema({
    newsId: Number,
    comments: [{
        comId: {
            type: Number,
            // index: true
        },
        username: {
            type: String,
            default: '匿名'
        },
        comDate: {
            type: Date,
            default: new Date()
        },
        content: String
    }]
});

// 通过 新闻 id 分页查询评论的方法
NewsCommentScheme.statics.findByPageIdx = function (id, pageIdx, callback) {
    const limStart = PAGE_SIZE * (pageIdx - 1);
    this.model('newscomment').findOne({
        'newsId': id
    }, {
        comments: {
            $slice: [limStart, limStart + PAGE_SIZE]
        }
    }).exec(callback);
};

// 定义实例的添加评论方法
NewsCommentScheme.statics.addComment = function (newsId, comment, callback) {
    Comment.findOne({
        newsId: newsId
    }, (err, data) => {
        if (err) return console.log(err);
        // 更新 评论的id自增
        const commentsList = data.comments;
        comment.comId = commentsList.length;

        data.comments.push(comment);
        // 继续修改这里的内容
        data.save(callback);
    });
};

// 通过这个 Schema 注册一个 Model
const Comment = db.model('newscomment', NewsCommentScheme);
// 定义通过新闻找到评论的实例方法
module.exports = Comment;