// 引入数据库
const db = require('./../db');
const path = require("path");

exports.addArticle = (req, res) => {
    // 判断上传的文章中是否上传了封面图片
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！');
    const articleInfo = {
        //标题，内容，状态，所属的分类Id
        ...req.body,
        // 文章封面在服务端的存放位置
        // cover_img: path.join('/uploads', req.file.filename + '.png'),
        cover_img: path.join(req.file.filename),
        // 文章发布时间
        pub_date: new Date()
    }

    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！')
        if (results.affectedRows !== 1) {
            if (articleInfo.state === '发布') {
                return res.cc("发布文章失败！")
            }
            else {
                return res.cc("存为草稿失败！")
            }
        }
        else {
            if (articleInfo.state === '发布') {
                return res.cc("发布文章成功！", 0)
            }
            else {
                return res.cc("已存为草稿！", 0)
            }
        }
    })
}

//获取全部文章的接口
// 一次获取5条的接口
exports.getArticle = (req, res) => {
    const begin = req.query.begin || 0;
    const limit = req.query.limit || 5;
    const className = req.query.className || 'all';
    if (className === "all") {
        const sql = `select * from ev_articles where is_delete=0 and state='发布' order by Id asc limit ${begin},${limit}`
        db.query(sql, (err, results) => {
            if (err) return res.cc('未知错误，请稍后再试！')
            const articles = results;
            const sqlCount = `select count(*) as total from ev_articles where is_delete=0 and state='发布'`
            db.query(sqlCount, (err, results) => {
                if (err) return res.cc("未知错误，请稍后再试！")
                const total = results[0].total;
                return res.send({
                    status: 0,
                    message: '获取文章列表成功！',
                    data: {
                        articles,
                        total
                    }
                })
            })
        })
    }

    //获取对应cate_id的文章列表和未归档（cate_id=0）的文章列表
    else {
        const sql = `select * from ev_articles where is_delete=0 and state='发布' and cate_id=${className} order by Id asc limit ${begin},${limit}`
        db.query(sql, (err, results) => {
            if (err) return res.cc('未知错误，请稍后再试！')
            const articles = results;
            const sqlCount = `select count(*) as total from ev_articles where is_delete=0 and state='发布' and cate_id=${className}`
            db.query(sqlCount, (err, results) => {
                if (err) return res.cc("未知错误，请稍后再试！")
                const total = results[0].total;
                return res.send({
                    status: 0,
                    message: '获取文章列表成功！',
                    data: {
                        articles,
                        total
                    }
                })
            })
        })
    }
}

//根据id获取对应文章信息的接口
exports.getText = (req, res) => {
    const id = req.query.id | 0;
    const sql = `select * from ev_articles where is_delete=0 and state="发布" and Id=${id} order by Id asc`
    db.query(sql, id, (err, results) => {
        if (err) return res.cc("未知错误，请稍后再试！")
        if (results.length != 1) return res.cc("获取文章失败！")
        return res.send({
            status: 0,
            msg: '获取文章成功！',
            data: results[0]
        })
    })
}

exports.getArticleTotal = (req, res) => {
    const className = req.query.className || 'all';
    if (className === 'all') {
        const sqlCount = `select count(*) as total from ev_articles where is_delete=0 and state='发布'`
        db.query(sqlCount, (err, results) => {
            if (err) return res.cc('未知错误，请稍后再试！')
            return res.send({
                status: 0,
                msg: '获取total成功！',
                total: results[0]
            })
        })
    }
    else {
        const sqlCount = `select count(*) as total from ev_articles where is_delete=0 and state='发布' and cate_id=${className}`
        db.query(sqlCount, (err, results) => {
            if (err) return res.cc('未知错误，请稍后再试！')
            return res.send({
                status: 0,
                msg: '获取total成功！',
                total: results[0]
            })
        })
    }
}