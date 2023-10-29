const db = require('./../db');
const path = require("path");

exports.clockInFunc = (req, res) => {
    // console.log(req.body);
    /*  res.send({
         status: 0,
         msg: 'hello'
     }) */
    const data = req.body;
    const sql = 'insert into clockin set ?'
    console.log(data);
    db.query(sql, data, (results, error) => {
        if (error) return res.cc('未知错误，请稍后再试！')
        if (results.affectedRows !== 1) return res.cc('新增信息失败，请稍后再试！')
        return res.cc('新增成功！', 0)
    })
}