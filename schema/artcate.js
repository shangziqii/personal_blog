const joi = require('joi');

//添加文章类型的验证模块
const className = joi.string().required();

exports.add_cate_schema = {
    body: {
        className
    }
}

//删除id对应的文章类别的模块
// integer表示该id必须是一个整数
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params: {
        id
    }
}
exports.get_cate_schema = {
    params: {
        id
    }
}
exports.update_cate_schema = {
    body: {
        Id: id,
        className
    }
}