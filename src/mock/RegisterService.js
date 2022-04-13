/*绑定Mock*/
const Mock = require('mockjs');
const Random = Mock.Random;

/*设置一个返回数据的通用结果*/
let result = {
    msg: '',
    data: ''
}

/*模拟数据库信息*/
let username = '';
let password = '';


/**
 * 拦截登陆请求
 */
Mock.mock('/register', 'post', (req) => {
    // 获取请求数据
    let from = JSON.parse(req.body);
    if(from.password===from.passwordconf){
        username=from.username;
        password=from.password;
        result.msg = '注册成功';
        result.data = 'true';
    }
    else{
        result.msg = '两次输入密码不同';
        result.data = 'false';
    }

    return result;
})
