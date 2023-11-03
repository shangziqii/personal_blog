const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/index');
const jwt = require('jsonwebtoken');
const config = require('../config');

//登录函数
exports.login = (req, res) => {
    const userInfo = req.body;
    const sql = "select * from blog_users where username=?"
    db.query(sql, userInfo.username, function (err, results) {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('请检查用户名');
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
        if (!compareResult) {
            return res.cc('密码错误，登陆失败');
        }

        //登陆成功..
        // 生成token字符串（该token字符串包括该用户的用户名和role）
        const user = { ...results[0], password: '' };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h'//token有效期是10h
        })

        res.send({
            status: 0,
            msg: '登陆成功！',
            token: 'Bearer ' + tokenStr
        })

    })
}


//注册函数
exports.regUser = (req, res) => {
    console.log('访问注册接口');

    const userInfo = req.body;
    console.log(userInfo);

    //判断账号密码是否输入为空
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            msg: '用户名或密码不能为空！'
        })
    }

    //判断数据库是否已存在该用户名
    const sql1 = 'select * from blog_users where username=?';
    db.query(sql1, [userInfo.username], function (err, results) {
        if (err) {
            return res.send({
                status: 1,
                // msg: err.msg
                msg: '发生未知错误'
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                msg: '用户名被占用，请输入其它用户名进行注册！'
            })
        }
        // 对用户密码进行加密处理
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);

        //插入新用户数据
        const sql2 = "insert into blog_users set ?";
        db.query(sql2, { username: userInfo.username, password: userInfo.password, role: userInfo.role },
            function (err, results) {
                if (err) {
                    return res.send({
                        status: 1,
                        msg: err.msg
                    })
                }
                // sql语句执行成功，但影响行数不为1
                if (results.affectedRows !== 1) {
                    return res.send({
                        status: 1,
                        msg: '注册用户失败，请稍后再试！'
                    })
                }
                res.send(
                    {
                        status: 0,
                        msg: '注册成功！'
                    }
                )

            }
        )
    })
}