const express = require('express');
const config = require('./config');
const expressJWT = require('express-jwt');

const bodyParser = require('body-parser');

//webscoket
const WebSocketServer = require('./websocketServer')
WebSocketServer.start()

const app = express();

//解决跨域问题
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: false }))

//托管静态资源
app.use('/blog/api/uploads', express.static('./uploads'))

app.use('/blog/api/visitor_pic', express.static('./visitor_pic'))

app.use(bodyParser.json());

// 使用.unless({path:[/^\/api\//]})指定哪些接口不需要token验证
// const joi = require('@hapi/joi');

//res.cc中间件
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.msg : err
        })
    }
    next()
})


app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/blog\//] }));
const joi = require('joi');

// 导入并注册用户路由模块
const userRouter = require('./router/router');
const artcate = require('./router/artcate');
const articleRouter = require('./router/article');
const userInfoRouter = require('./router/userinfo');
const commentRouter = require('./router/comment');
const clockInRouter = require('./router/clockIn');
app.use(userRouter);
app.use(artcate);
app.use(articleRouter);
app.use('/my', userInfoRouter);
app.use('/blog', commentRouter);
app.use('/blog', clockInRouter);
//错误级中间件
app.use(function (err, req, res, next) {
    //数据验证错误
    if (err instanceof joi.ValidationError) {
        return res.cc('参数不合法');
    }    //else返回未知错误
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败!');
    }

    res.cc(err)
})



app.listen(80, () => {
    console.log('http://127.0.0.1');
})