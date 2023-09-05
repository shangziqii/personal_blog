const joi = require('joi')

const inputValue = joi.string().required();
const Id = joi.number().required()
const role = joi.number().required()

exports.comment_schema = {
    body: {
        inputValue,
        Id,
        role
    }
}