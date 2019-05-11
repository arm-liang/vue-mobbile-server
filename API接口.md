# 端口详细请看 src/config.js，默认是3000

> ## CUD (添加、更新、删除)统一返回的数据：status 为-1 是查询失败， status 1 是查询成功

## 封面图片

### 查询封面，[http://localhost:3000/api/getcover](null)

````javascript
{
    status: 1,
    imgs: ['https://pic.baidu.com/a.png']
}
````

## 新闻

### 查询新闻，pageIdx 表示页码 [http://localhost:3000/api/getnews?pageIdx=1](null)

```javascript
{
    status: 1,
    news: [
        {
            add_time: '2019-04-27112019-04-27T12:53:13.489Z',
            clicked: 2,
            img_url: 'http://img1.baidu/a.png',
            title: '普通的标题',summary: '新闻的摘要',
            summary: '概要',
            add_time: '2019-04-27112019-04-27T12:53:13.489Z'
        }
    ]
}
````

### 按照新闻 id 查询新闻详细 [http://localhost:3000/api/getnewsdetail?newsId=1](null)

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

### 获取评论[http://localhost:3000/api/getnewscom?newsId=1&pageIdx=1](null)

````javascript
{
    comments: [
        {comId: 1, username: 'username', comDate: , content: }
    ]
}
````

### `post` 方法发送新闻评论 [http://localhost:3000/api/addnewscom?newsId=number](null)

````javascript
{
    username: 'username',
    content: '这个是我的内容'
}
````

## 图片 photo

### 获取图片分类 [http://localhost:3000/api/getphotypes](null)

````javascript
{
    status: 1
    types: ['清纯美女', '动漫']
}
````

### 分页获取对应分类的所有图片信息 [http://localhost:3000/api/getpho?pageIdx=0&type=类型](null)，`如果没有添加分类信息则是查询所有`

````javascript
{
    status: 1,
    phos: [{
        phoId: 1,
        type: '类型',
        phos: ['图片1', '图片2']
    }]
}
````

### 根据图片的id查询图片的详细 [http://localhost:3000/api/getphodetail?phoId=1](null)

````javascript
{
    phoId: 1,
    type: '类型',
}
````

### 根据图片的id查询图片的所有评论 [http://localhost:3000/api/getphocom?phoId=1](null)

````javascript
{
    comId: 0,
    username: '匿名',
    comDate: '2019-05-08T02:56:03.187+00:00',
    content: '沙发'
}
````

## 商品 Goods

### 分页获取所有的商品信息 [http://localhost:3000/api/getgod?pageIdx=1](null)

````javascript
{
    status: 1,
    gods: [
        {
            godId: 0,
            oldPrice: 999,
            newPrice: 699,
            addDate: '2019-05-10T07:54:29.984Z',
            intro: '商品的文字介绍',
            phos: ['商品图片一', '商品图片二'],
            imgIntro: ['图文介绍一', '图片介绍2],
            name: '商品名称',
            quantity: 30,
            godNumber: '201801160604531',
        }
    ]
}
````

### 获取商品详细 [http://localhost:3000/api/getgoddetail?godId=1](null)

````javascript
{
    status: 1,
    god: {
            godId: 0,
            oldPrice: 999,
            newPrice: 699,
            addDate: '2019-05-10T07:54:29.984Z',
            intro: '商品的文字介绍',
            phos: ['商品图片一', '商品图片二'],
            imgIntro: ['图文介绍一', '图片介绍2],
            name: '商品名称',
            quantity: 30,
            godNumber: '201801160604531',
        }
}

````

### 分页获取商品的评论 [http://localhost:3000/api/getgodcom?godId=1&pageIdx=1](null)

````javascript
{
    status: 1,
    comments: [{
        comId: 0,
        username: '用户名',
        content: '评论的内容'
    }]
}
````

### `post`方式发送商品评论[http://localhost:3000/api/addgodcom?godId=1](null)

````javascript
{
    username: 'username',
    content: '评论内容'
}
````