// 每次调用$.get或者$.post()或者$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置方案
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
})