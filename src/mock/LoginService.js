/*绑定Mock*/
const Mock = require('mockjs');
const Random = Mock.Random;

/*设置一个返回数据的通用结果*/
let result = {
    msg: '',
    data: '',
    pass:''
}

/*模拟数据库信息*/
let username = 'ziteng';
let password = '123456';
let verityCode = 'lmz是猪';

/**
 * 模拟验证码
 */
Mock.mock('/getVerifyCode', 'get', () => {
    result.data = {
        codeToken: Random.string(32),
        codeImg: Random.dataImage('75x40', verityCode)
    }
    return result;
})

/**
 * 拦截登陆请求
 */
Mock.mock('/', 'post', (req) => {
    // 获取请求数据
    let from = JSON.parse(req.body);
    //判断验证码
    if (verityCode === from.code) {
        // 验证账户
        console.log(password)
        if (username === from.username) {
            // 验证密码
            if (password === from.password) {
                result.msg = '登陆成功'
                result.data = 'true'
                result.pass=password

            } else {
                result.msg = '密码错误'
                result.data = 'false'
            }
        } else {
            result.msg = '用户不存在'
            result.data = 'false'
        }
    } else {
        result.msg = '验证码错误'
        result.data = 'false'
    }
    return result;
})
