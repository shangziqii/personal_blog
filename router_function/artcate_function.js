const db = require('../db/index')

//获取文章分类列表的处理函数
// 文章分类的数据库存储信息为className(分类名称)，id，是否delete
exports.getArtCates = (req, res) => {
    const sql = "select * from ev_article_cate where is_delete=0 order by id asc"
    db.query(sql, (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！')
        return res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results
        })
    })
}


//新增文章分类
exports.addArticleCates = (req, res) => {
    //判断新增的文章类别名字是否已经存在的sql语句
    const sql = 'select * from ev_article_cate where className=? and is_delete=0'
    db.query(sql, req.body.className, (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！')
        if (results.length === 1) return res.cc('该分类名称已被占用！')

        //新增
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc('未知错误，请稍后再试！')
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}


//根据Id删除文章分类
exports.deleteCateById = (req, res) => {
    /*     const sql = 'update ev_article_cate set is_delete=1 where id=?'
        db.query(sql, req.params.id, (err, results) => {
            if (err) return res.cc('未知错误,请稍后再试!')
            if (results.affectedRows !== 1) return res.cc('删除文章分类失败!')
            res.cc("删除文章分类成功!", 0)
        }) */
    const sql = 'select * from ev_articles where cate_id=?'
    db.query(sql, req.params.id, (err, results) => {
        // if (err) return res.cc('未知错误，请稍后再试！')
        for (let i = 0; i < results.length; i++) {
            const sql1 = `update ev_articles set cate_id=0 where id=?`
            db.query(sql1, results[i].Id, (err, results) => {
                // if (err) return res.cc('未知错误，请稍后再试！')
                // if (results.length !== 1) return res.cc('未知错误，请稍后再试！')
                return;
            })
        }

        const sql2 = 'update ev_article_cate set is_delete=1 where id=?'
        db.query(sql2, req.params.id, (err, results) => {
            // if (err) return res.cc('未知错误,请稍后再试!')
            // if (results.affectedRows !== 1) return res.cc('删除文章分类失败!')
            res.cc("删除文章分类成功!", 0)
        })
    })
}

//根据id获取文章分类获取数据
exports.getArticleById = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类失败!')
        res.send({
            status: 0,
            msg: '获取文章分类数据成功',
            data: results[0]
        })
    })
}

//根据文章类别的id更新文章类别名
exports.updateCatebyId = (req, res) => {
    const sql = 'select * from ev_article_cate where Id<>? and className=?'
    db.query(sql, [req.body.Id, req.body.className], (err, results) => {
        if (err) return res.cc('未知错误,请稍后再试!')
        if (results.length === 1) return res.cc('分类名称被占用,请更换后重试!')
        const sql = 'update ev_article_cate set ? where Id=?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc('未知错误,请稍后再试!')
            if (results.affectedRows !== 1) return res.cc("更新文章分类失败!")
            res.cc('更新文章分类成功!', 0)
        })
    })
}

exports.getCateById = (req, res) => {
    const id = req.query.id;
    const sql = `select * from ev_article_cate where Id=?`
    db.query(sql, id, (err, results) => {
        if (err) return res.cc('未知错误，请稍后再试！');
        if (results.length !== 1) return res.cc("查询错误（分类名不存在");
        return res.send(
            {
                msg: '获取类名成功！',
                status: 0,
                data: results[0]
            }
        )
    })
}