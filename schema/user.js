// 用户信息验证模块
// const joi = require('@hapi/joi');
const joi = require('joi');

const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,20}$/).required();
// const password = joi.string();
const role = joi.number();

exports.reg_login_schema = {
    //对req.body中的数据进行验证
    body: {
        username,
        password,
        // role
    }
}
// const avatar = joi.string().dataUri().required()
const avatar = joi.string().required()
exports.update_avatar_schema = {
    body: {
        avatar
    }
}