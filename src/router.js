/**
 * express 的路由对象负责处理，路由对应的操作
 */
const News = require('./models/News.js')
const NewsComment = require('./models/NewsComment.js')
const Cover = require('./models/Cover.js')
const xss = require('xss')

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
    })
}

/**
 * 通过新闻id查询新闻
 * 每一次查询就相当于用户访问了一次
 */
exports.doFindById = function (req, res) {
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
                news: JSON.stringify(data[0])
            })
        })
    });
}

/**
 * 这个方法在需要添加用户评论的时候执行
 */
exports.doAddNewsComment = function (req, res) {
    // 通过post请求获得 newsId
    const newsId = parseInt(req.body.newsId);
    // 构建NewsComment 评论对象
    const comment = {
        username: req.body.username,
        comDate: new Date(),
        content: xss(req.body.content)
    }

    // 添加评论, 添加的数据通过 xss 过滤
    NewsComment.addComment(newsId, comment, (err, data) => {
        if (err || data.n < 1) return res.send({
            status: -1
        });

        // 发送 JSON 数据
        res.send({
            status: 1
        })
    })
}


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
    })
}

/**
 * 通过新闻 id 分页查询新闻的所有评论
 */
module.exports.doGetCommentByNewsId = function (req, res) {
    let pageIdx = req.query.pageIdx || 1;
    pageIdx = parseInt(pageIdx);
    pageIdx = pageIdx <= 0 ? 1 : pageIdx;

    let newsId = req.query.newsId || 0;

    NewsComment.findByPageIdx(newsId, pageIdx, (err, data) => {
        if (err || !data.length) return res.send({
            status: -1
        });

        res.send({
            status: 1,
            comments: JSON.stringify(data)
        });
    })
}