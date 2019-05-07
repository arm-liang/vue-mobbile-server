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

// 定义通过 新闻 id 查询评论的静态方法
NewsCommentScheme.statics.findByNewsId = function (id, callback) {
    this.model('newscomment').find({
        'newsId': id
    }, callback);
}

// 通过 新闻 id 分页查询评论的方法
NewsCommentScheme.statics.findByPageIdx = function (id, pageIdx, callback) {
    this.model('newscomment').find({
        newsId: id
    }, {
        comments: 1
    }).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
}

// 定义实例的添加评论方法
NewsCommentScheme.statics.addComment = function (newsId, comment, callback) {
    Comment.findOneAndUpdate({
        newsId: newsId
    }, {
        $push: {
            'comments': comment
        }
    }, {
        new: true
    }, (err, data) => {
        if (err) return console.log(err);
        // 更新 评论的id自增
        const commentsList = data.comments;
        // 修改i最后一个评论的id为 length
        commentsList[commentsList.length - 1].comId = commentsList.length;
        // 继续修改这里的内容
        data.save(callback);
    })
}

// 通过这个 Schema 注册一个 Model
const Comment = db.model('newscomment', NewsCommentScheme);
// 定义通过新闻找到评论的实例方法
module.exports = Comment;