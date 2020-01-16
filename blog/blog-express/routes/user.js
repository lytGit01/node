var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});
router.get('/login-test', function(req, res, next) {
    if (res.session.username) {
        res.json(
            {
                erron: 0,
                msg: '已登录'
            }
        )
        return
    }
    res.json(
        {
            erron: -1,
            msg: '未登录'
        }
    )
})

// router.get('/session-test', function(req, res, next) {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//
//     res.json({viewNum: session.viewNum})
// });

module.exports = router;
