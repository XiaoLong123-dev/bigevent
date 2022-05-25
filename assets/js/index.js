$(function () {

    getUserInfo();



    // 退出按钮点击事件
    $('#btnLoginout').on('click', function () {
        // 提示用户是否确认退出
        layui.layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清楚本地存储中的token
            localStorage.removeItem('token');
            // 重新跳转到登录页
            location.href = 'login.html';
            // 关闭confirm询问框
            layer.close(index);
        });
    })



})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败');
            }
            // 渲染用户头像
            renderAvatar(res.data);
        }

    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的昵称或者用户名
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    if (user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avadar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        $('.text-avadar').html(name[0].toUpperCase()).show();
    }
}