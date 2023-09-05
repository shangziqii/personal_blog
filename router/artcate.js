const express = require('express');
const router = express.Router();
const art_function = require('./../router_function/artcate_function');
const expressJoi = require("@escook/express-joi");
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');

//获取文章分类的接口
router.get('/blog/cates', art_function.getArtCates);

//新增文章分类
router.post('/blog/addcates', expressJoi(add_cate_schema), art_function.addArticleCates);

//删除文章分类
router.get('/blog/deleteCateById/:id', expressJoi(delete_cate_schema), art_function.deleteCateById);

//根据id获取文章分类数据
router.get('/blog/cates/:id', expressJoi(get_cate_schema), art_function.getArticleById);

//根据id更新文章分类数据
router.post('/blog/updatecate', expressJoi(update_cate_schema), art_function.updateCatebyId);

//根据id获取文章对应的类名
router.get('/blog/getCate', art_function.getCateById);

module.exports = router