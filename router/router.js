const express = require('express');
// 创建路由对象
const router = express.Router();

const router_function = require('../router_function/router_function');

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
//导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user');

// 登录路由
router.post('/blog/login', expressJoi(reg_login_schema), router_function.login);

//注册用户..
router.post('/blog/register', expressJoi(reg_login_schema), router_function.regUser);

module.exports = router