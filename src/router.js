/* eslint-disable no-console */
/**
 * express 的路由对象负责处理，路由对应的操作
 */
const News = require('./models/News.js');
const NewsComment = require('./models/NewsComment.js');
const Cover = require('./models/Cover.js');
const Photo = require('./models/Photo.js');
const PhotoComment = require('./models/PhotoComment');
const xss = require('xss');

/**
 * 获取主页的封面信息
 */
module.exports.doGetCover = function (req, res) {
    Cover.find((err, data) => {
        if (err) return res.send({
            status: -1
        });
        let result = JSON.parse(JSON.stringify(data[0]));
        result.status = 1;
        res.send(result);
    });
};


// ------------------ 新闻模块开始 ------------------
/**
 * 这个方法当需要按照页码查询新闻的时候执行
 */
exports.doFindNewsByPageIdx = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    News.findByPage(pageIdx, (err, data) => {
        // 如果发成错误或者查询不到数据，返回状态码 -1
        if (err || data.length < 1) return res.send({
            status: -1
        });

        // 发送 JSON 数据
        res.send({
            status: 1,
            news: JSON.stringify(data)
        });
    });
};

/**
 * 通过新闻id查询新闻
 * 每一次查询就相当于用户访问了一次
 */
exports.doFindNewsById = function (req, res) {
    let newsId = req.query.newsId;

    if (!newsId) newsId = 1;

    News.clicked(newsId, () => {
        News.find({
            id: newsId
        }, (err, data) => {
            if (err || !data.length) return res.send({
                status: -1
            });

            // 发送JSON数据
            res.send({
                status: 1,
                news: data[0]
            });
        });
    });
};

/**
 * 这个方法在需要添加用户评论的时候执行
 */
exports.doAddNewsComment = function (req, res) {
    // 通过post请求获得 newsId
    const newsId = parseInt(req.body.newsId || req.query.newsId || 0);
    // 构建NewsComment 评论对象
    const comment = {
        username: req.body.username,
        comDate: new Date(),
        content: xss(req.body.content)
    };

    // 添加评论, 添加的数据通过 xss 过滤
    NewsComment.addComment(newsId, comment, (err, data) => {
        if (err || data.n < 1) return res.send({
            status: -1
        });

        // 发送 JSON 数据
        res.send({
            status: 1
        });
    });
};

/**
 * 通过新闻 id 分页查询新闻的所有评论
 */
module.exports.doGetCommentByNewsId = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    let newsId = parseInt(req.query.newsId || 0);

    NewsComment.findByPageIdx(newsId, pageIdx, (err, data) => {
        if (err || !data.comments.length) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            comments: data.comments
        });
    });
};

// ------------------ 新闻模块结束 ------------------



// ------------------ 图片模块结束 ------------------
/**
 * 获取所有的图片分类信息
 */
exports.doGetPhoTypes = function (req, res) {
    Photo.findAllTypes((err, data) => {
        if (err) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            types: data
        });
    });
};

/**
 * 根据图片的页码和分页信息查询部分图片信息
 */
exports.doGetPho = function (req, res) {
    let pageIdx = req.query.pageIdx || 0;
    pageIdx = parseInt(pageIdx);

    // 如果没有指定查询的类型就查询所有类型
    let type = req.query.type || /.*/;

    Photo.findPho(pageIdx, type, (err, data) => {
        if (err || !data.length) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            phos: data
        });
    });

};

/**
 * 通过图片id查询一个图片的详细
 */
exports.doGetPhoDetail = function (req, res) {
    const phoId = parseInt(req.query.phoId || 0);
    Photo.findByPhoId(phoId, (err, data) => {
        if (err) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            pho: data
        });
    });
};
/**
 * 通过图片id分页查询图片的评论
 */
exports.doGetPhoComByPage = function (req, res) {
    const phoId = parseInt(req.query.phoId || 0);
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    PhotoComment.findByPageIdx(phoId, pageIdx, (err, data) => {
        if (err || !data) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            comments: data.comments
        });
    });
};

/**
 * 添加图片的评论
 */
exports.doAddPhoComment = function (req, res) {
    const phoId = parseInt(req.query.phoId || 0);
    const comment = {
        username: '匿名',
        content: req.body.content
    };

    PhotoComment.addComment(phoId, comment, (err, data) => {
        if (err || !data) return res.send({
            status: -1
        });
        // 测试输出一下数据
        res.send({
            status: 1
        });
    });

};
// 测试图片添加的功能
// new Photo({
//     phos: ['图片1', '图片2', '图片3'],
//     intro: '测试图片2',
//     type: '测试2'
// }).save((err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
// });



// PhotoComment.addComment(0, {
//     content: '沙发'
// }, (err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
// });

// Photo.findAllTypes((err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
// });