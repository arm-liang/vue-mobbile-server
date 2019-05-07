# > 端口详细请看 src/config.js，默认是3000

> 不是查询操作的所有响应数据都是：status 为-1 是查询失败， status 1 是查询成功

## 封面图片

1. 查询封面，[http://localhost:3000/api/getcover](null)
2. 响应数据格式

````javascript
{
    status: 1,
    imgs: ['https://pic.baidu.com/a.png']
}
````

## 新闻

1. 查询新闻，pageIdx 表示页码
[http://localhost:3000/api/getnews?pageIdx=1](null)

2. 响应的数据格式

```javascript
{
    status: 1,
    news: [
        {
            add_time: '2019-04-27112019-04-27T12:53:13.489Z',
            clicked: 2,
            img_url: 'http://img1.baidu/a.png',
            title: '普通的标题',summary: '新闻的摘要',
            content: '<h1>新闻的主要内容</h1>',
            add_time: '2019-04-27112019-04-27T12:53:13.489Z'
        }
    ]
}
````

3. 按照新闻 id 查询新闻详细
[http://localhost:3000/api/getnewsdetail?newsId=1](null)

````javascript
{
    status: 1,
    news: {
            add_time: 2019-05-04T07:25:01.409Z,
            clicked: 0,_id: 5ccd3e4d2b822c0b0cf7b3e7,
            id: 1,
            img_url:'http://img3.imgtn.bdimg.com/it/u=3213710805,2599468180&fm=26&gp=0.jpg',
            title: '我熊猫头不服',
            summary: '这是一个熊猫头的摘要',
            content: '<h1>熊猫头的标题</h1>',
        }
}
````

## 新闻评论

1. 获取评论[http://localhost:3000/api/getnewscom?newsId=1&pageIdx=1](null)

2. 响应数据格式

````javascript
{
    comments: [
        {comId: 1, username: 'username', comDate: , content: }
    ]
}
````

3. 添加新闻评论
[http://localhost:3000/api/addnewscom](null)

4. 发送数据格式要求

````javascript
{
    newsId: 1,
    username: 'username',
    content: '这个是我的内容'
}
````

3. 响应数据格式

如上定义