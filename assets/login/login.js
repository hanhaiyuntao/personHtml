/**
 * Created by 24028 on 2019/1/3.
 */
// 登录页面
var fromUrl = null;//
var baseUrl = 'http://127.0.0.1';
window.onload = function(){

}



//正确函数
function snackbar(msg) {
    var content = $('<div class="snackbar el-message">' + msg + '</div>');
    if ($('.snackbar').length < 1) {
        content.appendTo($('body'));
        content.animate({
                top: 50,
                opacity: 1,


            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(1500).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    } else {
        $('.snackbar').not($(this)).remove();
        content.appendTo($('body'));
        content.animate({
                top: 50,
                opacity: 1
            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(1000).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    }

}
//错误提示函数
function errorSnackbar(msg) {
    var content = $('<div class="errorbar el-message">' + msg + '</div>');
    if ($('.snackbar').length < 1) {
        content.appendTo($('body'));
        content.animate({
                top: 50,
                //opacity: .8
            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(2000).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    } else {
        $('.snackbar').not($(this)).remove();
        content.appendTo($('body'));
        content.animate({
                top: 50,
                // opacity: .8
            },
            600, function () {
                /* stuff to do after animation is complete */
                content.delay(1000).fadeOut(500, function () {
                    $(this).remove();
                });
            });
    }

}

//存储cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}
/*
* 登录注册切换
*
* */
$(".change-login>p").click(function(){
    $(".change-login>p").removeClass("on");
    $(this).addClass("on");
    $('.formId').addClass("hide");
    $('.formId').eq($(this).index()).removeClass('hide');
    $("#noRegName").addClass('hide');
    $("#noRegPsw").addClass('hide');
    $("#noLogName").addClass('hide');
    $("#noLogPsw").addClass('hide');
    $(".newInput").val("");
})
/**
 *
 *账号注册
 *
 * */

$("#regCheck").click(function(){
    $(".change-login>p").removeClass("on");
    $(".change-login>p").eq(1).addClass("on");
    $('.formId').addClass("hide");
    $('.formId').eq(1).removeClass('hide');

});

//注册
function register(){
    var n = $("#name2").val();
    var p = $('#password2').val();
    var lObj = {
        uname:n,
        upsw:p,
    };
    if(lObj.uname==null ||lObj.uname==''){
        $("#noRegName").removeClass('hide');
        return;
    }
    if(lObj.upsw==null ||lObj.upsw==''){
        $("#noRegName").addClass('hide');
        $("#noRegPsw").removeClass('hide');
        return;
    }
    if($("#inputCheck").prop('checked')!=true){
        errorSnackbar('请先同意用户协议');
        return;
    }
        $.ajax({
            url: baseUrl+":6005/reg",
            type: "post",
            data:lObj,
            success: function (data) {
                console.log(data)
                $("#noRegName").addClass('hide');
                $("#noRegPsw").addClass('hide');
                if(data.code==200){
                    snackbar(data.msg)
                }else{
                    errorSnackbar(data.msg)
                }

            },
            error: function (error) {
                $("#noRegName").addClass('hide');
                $("#noRegPsw").addClass('hide');
                console.log(error);
                errorSnackbar("服务器异常,请稍后重试");
            }
        });
}

//登录
function login(){
    var n = $("#logName2").val();
    var p = $('#logPsw').val();
    var lObj = {
        uname:n,
        upsw:p,
    };
    if(lObj.uname==null ||lObj.uname==''){
        $("#noLogName").removeClass('hide');
        return;
    }
    if(lObj.upsw==null ||lObj.upsw==''){
        $("#noLogName").addClass('hide');
        $("#noLogPsw").removeClass('hide');
        return;
    }
    $.ajax({
        url: baseUrl+":6005/login",
        type: "post",
        data:lObj,
        success: function (data) {
            $("#noLogName").addClass('hide');
            $("#noLogPsw").addClass('hide');
            var result = data.result;
            if(result.code==200){
                //if($("#loginCheck").is(':checked')){
                    setCookie('name',lObj.uname,30);
                    setCookie('password',lObj.upsw,30);
                    console.log(getCookie('name'));
                    console.log(getCookie('password'));

                //}else{
                //    sessionStorage.setItem('s_name',lObj.uname);
                //    sessionStorage.setItem('s_psw',lObj.upsw);
                //}
                snackbar('登录成功、正在跳转...');
                if (fromUrl != null) {
                    window.location.href = fromUrl;
                } else {
                    window.location.href = 'index.html';
                }
            }else{
                errorSnackbar(result.msg)
            }

        },
        error: function (error) {
            $("#noLogName").addClass('hide');
            $("#noLogPsw").addClass('hide');
            console.log(error);
            errorSnackbar("服务器异常,请稍后重试");
        }
    });
}
/*鼠标点击事件*/
$(document).keydown(function(event){
    if(event.keyCode==13){
        if($(".account_number").hasClass('on')){
            $("#login").click();
        }
        if($(".message").hasClass('on')){
            $("#register").click();
        }

    }
});


