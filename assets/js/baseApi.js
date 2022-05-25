// 每次调用$.get或者$.post()或者$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置方案
$.ajaxPrefilter(function (options) {
    // 在发送真正的ajax请求之前 统一拼接请求的根路径
    options.url = "http://www.liulongbin.top:3007" + options.url;
    console.log(options.url);

    // 统一为有权限的接口添加Header请求头
    // 判断是否是有权限的请求
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 全局统一挂载complete回调函数
    // 无论请求成功还是失败，都会调用complete回调函数
    // 在complete回调函数中，可以使用responseJSON拿到服务器响应回来的数据
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 跳转到login.html
            location.href = 'login.html';
        }
    }
})
