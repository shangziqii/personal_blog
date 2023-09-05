const db = require('./../db');

// 判断token的有效性
exports.getTokentf = (req, res) => {
    return res.cc('token有效', 0)
}

// 个人中心
exports.getUserInfo = (req, res) => {
    const sql = 'select role,username,user_pic from blog_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc("未知错误，请稍后再试！")
        if (results.length !== 1) return res.cc("获取用户信息失败！")
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0]
        })
    })
}

//更新个人头像
exports.updataAvatar = (req, res) => {
    const sql = 'update blog_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！');
        if (results.affectedRows !== 1) return res.cc('更新头像失败！');
        return res.cc('更新头像成功！', 0);
    })
}