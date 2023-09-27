// 导入express框架
const express = require('express');
// 创建路由对象
const router = express.Router();

const { addArticle, getArticle, getText, getArticleTotal, getTextList } = require('./../router_function/article_function')

const expressJoi = require('@escook/express-joi');

const { add_article_schema } = require("./../schema/article");

// 配置multer
// 导入解析formdata格式表单数据的包
const multer = require("multer");
// 导入处理路径的核心模块
const path = require("path");
// 创建multer的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })


//引入路由函数

// 发布新文章
router.post('/blog/add', upload.single('cover_img'), addArticle);

//获取全部/分类的文章的接口
router.get('/blog/getArticle', getArticle);

//根据id获取对应文章内容的接口
router.get('/blog/getText', getText)

//获取对应类别文章个数的接口
router.get('/blog/getArticleTotal', getArticleTotal)

//根据关键字获取对应文章列表
router.post('/blog/getTextList', getTextList)

//向外暴露
module.exports = router