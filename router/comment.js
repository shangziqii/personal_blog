const express = require('express')
const router = express.Router()

const { publish, getComment } = require('./../router_function/comment_function')

const expressJoi = require('@escook/express-joi');
const { comment_schema } = require("./../schema/comment");

//发布评论
router.post('/comment/publish', expressJoi(comment_schema), publish)


//获取全部评论
router.get('/comment/get', getComment)

module.exports = router;