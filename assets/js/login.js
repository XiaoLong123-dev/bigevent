$(function () {
    // 点击去注册账号
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录账号
    $("#link_login").on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // layer.msg('注册成功');
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义pass校验规则 [\S]不能包含空格
        pas: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位，且不能包含空格'
        ],
        // 校验两次密码不一致
        repas: function (value) {
            // 形参是确认密码的值
            // 通过属性选择器拿到密码的值 一定要加空格
            var rev = $('.reg-box [name=password]').val();
            if (value !== rev) {
                return '两次密码不一致';
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            // 模拟人的点击行为
            $('#link_login').click();
        });
    })

    // 监听登陆表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        // layer.msg('登陆成功');
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'post',
            // 快速获取表单内容
            data: $(this).serialize(),
            succes: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登陆成功');
                console.log(res.token);
                // 将登陆成功的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转到index主页
                location.href = '/index.html';
            }
        })
    })

})