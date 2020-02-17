var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // if (req.query.isadmin) {
    //     // 管理员界面
    //     const loginCheckResult = loginCheck(req)
    //     if (loginCheckResult) {
    //         // 未登录
    //         return loginCheckResult
    //     }
    //     // 强制查询自己的博客
    //     author = req.session.username
    // }

    const result = getList(author, keyword)
    return result.then(listData => {
        console.log(listData)
        res.json(
            new SuccessModel(listData)
        )
    })
});

// 用id获取详情
router.get('/detail', function(req, res, next) {
    const id = req.query.id || '';
    const result = getDetail(id);
    return result.then(Detail => {
        res.json(
            new SuccessModel(Detail)
        )
    })
});

module.exports = router;
