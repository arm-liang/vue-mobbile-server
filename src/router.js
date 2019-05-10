/* eslint-disable no-console */
/**
 * express 的路由对象负责处理，路由对应的操作
 */
const News = require('./models/News.js');
const NewsComment = require('./models/NewsComment.js');
const Cover = require('./models/Cover.js');
const Photo = require('./models/Photo.js');
const PhotoComment = require('./models/PhotoComment');
const Goods = require('./models/Goods.js');
const GoodsComment = require('./models/GoodsComment.js');

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



// ------------------ 图片模块开始 ------------------
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

// ------------------ 图片模块结束 ------------------

// ------------------ 商品模块开始 ------------------
/**
 * 通过页码分页查询商品信息
 */
exports.doGetGoodsByPage = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    Goods.findByPage(pageIdx, (err, data) => {
        // 如果发成错误或者查询不到数据，返回状态码 -1
        if (err || data.length < 1) return res.send({
            status: -1
        });

        // 发送 JSON 数据
        res.send({
            status: 1,
            gods: data
        });
    });
};

/**
 * 通过商品id分页查询商品的所有评论
 */
exports.doGetCommentByGodId = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    let godId = parseInt(req.query.godId || 0);

    GoodsComment.findByPageIdx(godId, pageIdx, (err, data) => {
        if (err || !data.comments.length) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            comments: data.comments
        });
    });
};

/**
 * 通过商品id查询商品详细
 */
exports.doFindGodDetailByid = function (req, res) {
    let godId = parseInt(req.query.godId || 0);

    Goods.findOne({
        godId: godId
    }, (err, data) => {
        if (err) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            god: data
        });
    });
};

/**
 * 添加商品的评论
 */
exports.doAddGodComment = function (req, res) {
    // 通过post请求获得 newsId
    const godId = parseInt(req.body.godId || req.query.godId || 0);
    // 构建NewsComment 评论对象
    const comment = {
        username: req.body.username,
        comDate: new Date(),
        content: xss(req.body.content)
    };

    // 添加评论, 添加的数据通过 xss 过滤
    GoodsComment.addComment(godId, comment, (err, data) => {
        if (err || data.n < 1) return res.send({
            status: -1
        });

        // 发送 JSON 数据
        res.send({
            status: 1
        });
    });
};

// ------------------ 商品模块结束 ------------------

// 测试商品的添加和查找
// new Goods({
//     name: '华为HONOR荣耀8X',
//     oldPrice: 1299,
//     newPrice: 1299,
//     intro: '【64GB限时优惠100元】华为HONOR荣耀8X全面大屏幕指纹解锁智能游戏青春学生新手机老年人电话机官方网旗舰店',
//     quantity: 30,
//     godNum: '2018011606104531',
//     imgIntro: [
//         'https://img.alicdn.com/imgextra/i1/1114511827/O1CN01M8FYpg1PMo7OOgYJi_!!1114511827.jpg',
//         'https://img.alicdn.com/imgextra/i4/1114511827/O1CN01veIT5X1PMo7NFBvRI_!!1114511827.jpg',
//         'https://img.alicdn.com/imgextra/i3/1114511827/O1CN01zaLP3P1PMo7P12Wta_!!1114511827.jpg',
//         'https://img.alicdn.com/imgextra/i2/1114511827/O1CN01V8FXWq1PMo7MUptf1_!!1114511827.jpg'
//     ]
// }).save((err, data) => {
//     if (err) return console.log(err);

//     console.log(data);
// });
// new Goods({
//     name: 'Meizu/魅族 16th',
//     oldPrice: 2499,
//     newPrice: 2299,
//     intro: 'Meizu/魅族 16th骁龙845 超窄边框全面屏 屏下指纹解锁 双摄拍照旗舰手机',
//     quantity: 20,
//     godNum: '2018011606090990',
//     imgIntro: [
//         'https://img.alicdn.com/imgextra/i1/1695308781/O1CN012EjkKRqY01dBJlq_!!1695308781.jpg',
//         'https://img.alicdn.com/imgextra/i4/1114511827/O1CN01veIT5X1PMo7NFBvRI_!!1114511827.jpg',
//         'https://img.alicdn.com/imgextra/i1/1695308781/TB2Y6DLJKSSBuNjy0FlXXbBpVXa_!!1695308781.jpg',
//         'https://img.alicdn.com/imgextra/i2/1695308781/TB2f9SzByOYBuNjSsD4XXbSkFXa_!!1695308781.jpg',
//     ]
// }).save((err, data) => {
//     if (err) return console.log(err);

//     console.log(data);
// });
// new Goods({
//     name: 'Xiaomi/小米9',
//     oldPrice: 3999,
//     newPrice: 3988,
//     intro: '小米无线快充Xiaomi/小米9全面屏新品手机官方旗舰店mix3骁龙855',
//     quantity: 89,
//     godNum: '2018011606140619',
//     imgIntro: [
//         'https://img.alicdn.com/imgextra/i1/263726286/O1CN01w4svnC1wJ2AUMO0Ds_!!263726286.jpg',
//         'https://img.alicdn.com/imgextra/i1/263726286/O1CN01w4svnC1wJ2AUMO0Ds_!!263726286.jpg',
//         'https://img.alicdn.com/imgextra/i1/263726286/O1CN01w4svnC1wJ2AUMO0Ds_!!263726286.jpg',
//         'https://img.alicdn.com/imgextra/i1/263726286/O1CN01w4svnC1wJ2AUMO0Ds_!!263726286.jpg',
//     ]
// }).save((err, data) => {
//     if (err) return console.log(err);

//     console.log(data);
// });

// GoodsComment.addComment(0, {
//     username: '匿名',
//     content: '沙发222'
// }, (err, data) => {

//     if (err) return console.log(err);

//     console.log(data);
// });