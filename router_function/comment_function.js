const db = require('./../db');
const path = require("path");
const fs = require('fs');

//图片文件夹路径
// const floderPath = './visitor_pic';


//添加评论
exports.publish = (req, res) => {
    const commentInfo = {
        article_id: req.body.Id,
        comment: req.body.inputValue,
        time: new Date(),
        name: '管理员',
        pic: 'b',
        role: req.body.role
    }
    if (req.body.role === 0) {
        // 如果发送评论的是作者
        // 向存储用户数据的数据库表获取user_pic和username
        const sql0 = 'select * from blog_users where id=1'
        db.query(sql0, (err, results) => {
            if (err) {
                return res.cc('未知错误，请稍后再试！')
            }
            if (results.length !== 1) {
                commentInfo.name = '管理员'
                commentInfo.pic = 'c'
                db.query(sql, commentInfo, (err, results) => {
                    if (err) return console.log(err);
                    else if (results.affectedRows === 1) return res.send({
                        status: 0,
                        msg: '评论成功'
                    })
                    else return res.cc('发布失败！')
                })
            }
            else {
                commentInfo.name = results[0].username
                commentInfo.pic = results[0].user_pic
                const sql = 'insert into blog_comment set ?'
                db.query(sql, commentInfo, (err, results) => {
                    if (err) return console.log(err);
                    else if (results.affectedRows === 1) return res.send({
                        status: 0,
                        msg: '评论成功'
                    })
                    else return res.cc('发布失败！')
                })
            }
        })
        /*  const sql = 'insert into blog_comment set ?'
         db.query(sql, commentInfo, (err, results) => {
             if (err) return res.cc('未知错误，请稍后再试。。。。。！')
             else if (results.affectedRows === 1) return res.send({
                 status: 0,
                 msg: '评论成功'
             })
             else return res.cc('发布失败！')
         }) */
    }
    else {
        // 读取文件夹中的所有文件
        const visitor_pic = () => {
            const floderPath = './visitor_pic';

            fs.readdir(floderPath, (err, files) => {

                // 读取错误并返回
                if (err) {
                    console.log('无法读取文件夹中的文件：', err);
                    commentInfo.pic = '无法获取到图片链接'
                    return;
                }

                // 过滤出图片文件
                const imageFiles = files.filter(file => {
                    const extname = path.extname(file).toLowerCase();
                    return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname);
                });

                // 没有图片文件的情况
                if (imageFiles.length === 0) {
                    console.log('文件夹中没有图片文件。');
                    commentInfo.pic = '无法获取到图片链接'
                    return;
                }

                // random方法获取0-1直接的随机数，然后与数组长度相乘，向下取整得到的就是从0-数组长度-1的一个随机数
                const randomIndex = Math.floor(Math.random() * imageFiles.length);

                const randomImage = imageFiles[randomIndex];
                commentInfo.pic = randomImage
                const sql = 'insert into blog_comment set ?'
                db.query(sql, commentInfo, (err, results) => {
                    if (err) return res.cc('未知错误，请稍后再试！')
                    else if (results.affectedRows === 1) return res.send({
                        status: 0,
                        msg: '评论成功'
                    })
                    else return res.cc('发布失败！')
                })
            })
        }
        visitor_pic()

        //用户随机名函数
        
        commentInfo.name = '用户'
    }

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