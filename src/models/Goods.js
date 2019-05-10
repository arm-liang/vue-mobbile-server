/* eslint-disable no-console */
const mongoose = require('mongoose');
const db = require('../util/db.js');

// 一页显示吧八条商品信息和八条商品评论
const PAGE_SIZE = 8;

// 创建 商品 Goods 的Schema对象
const GoodsSchema = mongoose.Schema({
    // 商品的id号码
    godId: Number,
    // 商品的名称
    name: String,
    // 商品的原价
    oldPrice: Number,
    // 商品的现价
    newPrice: Number,
    // 商品的文字介绍
    intro: String,
    // 商品的库存
    quantity: Number,
    // 商品的编号
    godNum: String,
    // 商品的添加日期
    addDate: {
        type: Date,
        default: new Date()
    },
    // 商品的图片介绍
    phos: [String],
    // 商品的多个图文介绍的图片地址
    imgIntro: [String]
});

GoodsSchema.pre('save', function (next) {
    // 在保存商品信息之前修改商品的id自增
    this.model('goods').find({}, (err, data) => {
        if (err) return console.log(err);

        this.godId = data.length;
        next();
    });
});

GoodsSchema.post('save', function (doc, next) {
    // 在商品添加完成之后生成对应的评论
    const comModel = this.model('goodscomment');

    comModel.find({}, (err) => {
        if (err) return console.log(err);
        new comModel({
            godId: doc.godId,
            comments: []
        }).save(next);
    });

});

// 分页查找商品信息
GoodsSchema.statics.findByPage = function (pageIdx, callback) {
    this.model('goods').find({}).skip(PAGE_SIZE * (pageIdx - 1)).limit(PAGE_SIZE).exec(callback);
};



// 数据库中注册 Goods Model
module.exports = db.model('goods', GoodsSchema);