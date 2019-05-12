# 这是一个配合VUE移动端网页学习项目 [vue-mobbile](https://github.com/arm-liang/vue-mobbile-learning) 使用的 nodejs 服务器

> 项目使用 nodejs + express + mongodb + mongoose 来实现网页JSON服务器，服务器默认运行在本地3000端口
> 测试服务器 [http://120.77.181.41:3000]()，由于Nodejs单线程的缘故，服务器可能会崩。所以如果崩了，请自己动手去搭建。
> 服务器的数据在下面的压缩包里面，请使用 mongorestore -h <hostname><:port> -d dbname <path>，来初始化服务器数据
> 比如 mongorestore -h localhost:27017 -d mobile ./mobile

## [总体设计](总体设计.md)

> 该文件定义了本服务器的总体设计，包括服务器实现的几大模块，模块内部的功能

## [数据字典](数据字典.md)

> 该文件定义了数据库表格的设计，使用 Mongoose Schema 格式定义
> 在实现字段自增的时候通过 pre post 中间件来实现(后期可以通过自建一个保存所有自增字段的数据的表)

## [API接口](API接口.md)

> 该文件定义了前台浏览器和服务器沟通的采用何种标准

>### 本项目仅供学习和参考，请勿用于任何商业用途，任何图片和资源均来自网络，转载请注明出处，如果喜欢请不要忘了 `Star` :star: and `Fork` :fork_and_knife: me
