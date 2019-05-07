/* eslint-disable no-console */
/**
 * 创建一个 News 新闻对象的 Schema 对象
 * News 如果通过静态方法创建News的话 News 的id不会自增，需要通过 new News 的方式生成
 */
// 引入数据库连接对象
const db = require('../util/db.js');
const mongoose = require('mongoose');

// 定义一页八条数据
const PAGE_SIZE = 8;

// 通过 mongoose 创建一个Schema
const NewsSchema = mongoose.Schema({
    id: {
        type: Number,
        // index: true
    },
    add_time: {
        type: Date,
        default: new Date()
    },
    clicked: {
        type: Number,
        default: 0
    },
    img_url: String,
    title: String,
    summary: String,
    content: String
});


// 定义实例方法方便分页查找
NewsSchema.statics.findByPage = function (pageIdx, callback) {
    // 先跳过 page_size * (pageIdx-1) 个新闻 然后 只查询 page_size 个
    this.model('news').find({}).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
};

// 点击了对应的文章之后，文章的点击数目加一
NewsSchema.statics.clicked = function (newsId, callback) {
    // $inc increase 自增的意思，递减的话 $inc -num
    this.model('news').update({
        'id': newsId
    }, {
        $inc: {
            'clicked': 1
        }
    }, callback);
};

NewsSchema.pre('save', function (next) {
    // 在保存新闻之前修改新闻的id自增
    this.model('news').find({}, (err, data) => {
        if (err) return console.log(err);

        this.id = data.length;
        next();
    })
})
// 在新闻保存之后让新闻的评论自动添加
NewsSchema.post('save', function (doc, next) {
    // 添加新闻评论的模板内容
    const newComModel = this.model('newscomment');
    newComModel.find({}, (err) => {
        if (err) return console.log(err);
        new newComModel({
            newsId: doc.id,
            comments: []
        }).save(next);
    })
})

module.exports = db.model('news', NewsSchema);