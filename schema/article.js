// 导入定义验证规则的模块
const joi = require('joi');

//定义各部分的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
// const cate_id = joi.string().required();

const content = joi.string().required().allow();
const state = joi.string().valid('发布', '草稿').required();

// 验证规则对现象-发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}

