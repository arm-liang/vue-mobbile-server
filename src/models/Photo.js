/* eslint-disable no-console */
/**
 * 创建一个 Photo 图片对象的 Schema 对象
 */
const db = require('../util/db.js');
const mongoose = require('mongoose');

// 定义分页查询的时候一页显示多少张图片
const PAGE_SIZE = 4;
// 创建 Schema 对象
const PhotoSchema = mongoose.Schema({
    // 图片分享的id号码
    phoId: Number,

    // 多个图片的 url地址
    phos: [String],

    // 图片的介绍
    intro: String,

    // 图片的分类
    type: String
});

// 在保存数据之前修改 phoId 自增
PhotoSchema.pre('save', function (next) {
    Photo.find({}, (err, data) => {
        if (err) return console.log(err);

        this.phoId = data.length;
        next();
    });
});

// 在保存数据结束之后生成图片对于的评论基本信息
PhotoSchema.post('save', function (doc, next) {
    const photoComModel = this.model('photocomment');
    // 新创建一个 图片的评论对象，这个对象的id为图片的id
    photoComModel.find({}, (err) => {
        if (err) return console.log(err);
        new photoComModel({
            phoId: doc.phoId,
            comments: []
        }).save(next);
    });
});

// 查找所有图片的分类
PhotoSchema.statics.findAllTypes = function (callback) {
    // 查找所有的图片然后筛选 type 属性，然后type去重输出一个类型字符串数组
    this.model('photo').find({}, {
        type: 1
    }).distinct('type').exec(callback);
};

// 通过分页和类型部分查询
PhotoSchema.statics.findPho = function (pageIdx, type, callback) {
    this.model('photo').find({
        type
    }).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
};

// 通过 phoId 查询一个图片的信息
PhotoSchema.statics.findByPhoId = function (phoId, callback) {
    this.model('photo').findOne({
        phoId: phoId
    }, callback);
};
const Photo = db.model('photo', PhotoSchema);
// 在数据库连接对象中注册这个 模型, 并向外导出这个 Model
module.exports = Photo;