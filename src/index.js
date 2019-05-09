/* eslint-disable no-console */
const express = require('express');
const router = require('./router.js');
const port = require('./config.js').port;

const app = express();
// 引入json解析中间件
const bodyParser = require('body-parser');
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// 允许所有的请求形式
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ---------------------- 新闻News路由开始 ----------------------

// 根据 pageIdx 分页查询新闻
app.get('/api/getnews', router.doFindNewsByPageIdx);

// 根据 newsId 查询新闻的详细，并且自增新闻的点击量
app.get('/api/getnewsdetail', router.doFindNewsById);

// 获取主页的封面图
app.get('/api/getcover', router.doGetCover);

// 根据新闻 newsId 和 pageIdx 分页获取新闻的评论
app.get('/api/getnewscom', router.doGetCommentByNewsId);

// ---------------------- 新闻News路由结束 ----------------------

// ---------------------- 图片Photo路由开始 ----------------------

// 获取所有的图片分类
app.get('/api/getphotypes', router.doGetPhoTypes);

// 根据图片的页码和图片的分页查询部分图片信息
app.get('/api/getpho', router.doGetPho);

// 获取图片的详细
app.get('/api/getphodetail', router.doGetPhoDetail);

// 获取所有的图片评论
app.get('/api/getphocom', router.doGetPhoComByPage);

// 添加图片的评论
app.post('/api/addphocom', router.doAddPhoComment);

// ---------------------- 图片Photo路由结束 ----------------------

// 匹配 404
app.get('*', (req, res) => {
    res.send('没有找到网页');
});

// 添加评论
app.post('/api/addnewscom', router.doAddNewsComment);

// app 默认在 6666 端口监听
app.listen(port);
console.log('server listen on http://localhost:' + port);