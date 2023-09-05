const db = require('./../db');
const path = require("path");

//添加评论
exports.publish = (req, res) => {
    const commentInfo = {
        article_id: req.body.Id,
        comment: req.body.inputValue,
        time: new Date(),
        name: '管理员',
        pic: 'b'
    }
    if (req.body.role === 0) {
        commentInfo.name = '管理员'
        commentInfo.pic = 'c'
    }
    else {
        commentInfo.name = '用户',
            commentInfo.pic = 'd'
    }
    const sql = 'insert into blog_comment set ?'
    db.query(sql, commentInfo, (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！')
        else if (results.affectedRows === 1) return res.send({
            status: 0,
            msg: '评论成功'
        })
        else return res.cc('发布失败！')
    })
}

exports.getComment = (req, res) => {
    const article_id = req.query.textId
    const sql = `select * from blog_comment where article_id=${article_id} order by Id asc`
    db.query(sql, article_id, (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！')
        return res.send({
            status: 0,
            message: '获取文章评论成功！',
            data: results
        })
    })
}