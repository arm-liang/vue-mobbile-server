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

app.get('/', (req, res) => {
    res.send('首页');
});
// 根据 pageIdx 分页查询新闻
app.get('/api/getnews', router.doFindNewsByPageIdx);

// 根据 newsId 查询新闻的详细，并且自增新闻的点击量
app.get('/api/getnewsdetail', router.doFindById);

// 获取主页的封面图
app.get('/api/getcover', router.doGetCover);

// 根据新闻 newsId 和 pageIdx 分页获取新闻的评论
app.get('/api/getnewscom', router.doGetCommentByNewsId);

// 匹配 404
app.get('*', (req, res) => {
    res.send('没有找到网页');
});

// 添加评论
app.post('/api/addnewscom', router.doAddNewsComment);

// app 默认在 6666 端口监听
app.listen(port);
console.log('server listen on http://localhost:' + port);