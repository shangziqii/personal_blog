const express = require('express');
const router = express.Router();
const router_function = require('./../router_function/userinfo_function');
const expressJoi = require('@escook/express-joi');
const { update_avatar_schema } = require('../schema/user')

//判断token的有效性
router.get('/token', router_function.getTokentf);

//个人中心
router.get('/userinfo', router_function.getUserInfo);
router.post('/update/avatar', expressJoi(update_avatar_schema), router_function.updataAvatar)

module.exports = router;