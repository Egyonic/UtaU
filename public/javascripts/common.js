var count = 5;
var page = 1;

$(document).ready(function () {
    changeUserButton();
    checkLogin();   //检查登陆情况，若登陆则改变右上角头像
    $("#checkButton").click( check );
    $("#registerButton").click( register );
    $("#loginButton").click( login );

});

function checkLogin() {
    if( sessionStorage.getItem("account") ){
        var acc =sessionStorage.getItem("account");
        changeHeadIcon( acc);
        // console.log("already log in");
    }else{
        console.log("not log in");
    }
}

//处理检查按钮，检查账户是否已存在，并通知用户
function check(event) {
    var account = document.getElementById('inputAccount').value;

    $.ajax({
        url: "registerCheck/check",
        type: "POST",
        dataType: "text",
        data: 'account='+account,

        complete: function () {
        },

        success: function (result) {
            alert("用户名"+result);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.statusText);
            console.log(jqXHR.status);
            console.log(jqXHR.readyState);
            alert("连接发生错误");
        },
    });
}

function register(event) {
    var account = $("#inputAccount").val();
    var psd = $("#inputPassword").val();
    var eml = $("#inputEmail").val();

    $.post("registerCheck/register",{ acc:account, password:psd, email:eml},function (data) {
        if(data == true){
            alert("注册成功!将跳转至个人中心");
            window.location.href = "userCenter";
        }else {
            alert("用户名不可用，请重试");
        }

    });
}

//点击登陆按钮时用户验证
function login() {
    var account = $("#loginAccount").val();
    var psd = $("#loginPassword").val();

    $.post("login",{ acc:account, password:psd},function (data) {
        console.log(data);
        if(data == true){
            // alert("验证成功!将跳转至个人中心");
            sessionStorage.setItem("account",account);
            // console.log("account before sent to backend");
            // console.log(sessionStorage.getItem("account"));
            // alert(sessionStorage.getItem("account"));
            window.location.href = "userCenter?account="+account;
        }else {
            alert("用户名或密码错误,请重试");
        }

    });
}

//根据登陆改变右上角头像
function changeHeadIcon( acc) {
    $.post("userCenter",{account:acc, action:"query" }, function (data) {
        // console.log(data);
        if(data){
            // console.log("success");
            $("#headIcon").attr("src",data.user.image); //改变头像
            //使头像的链接指向用户中心
            $("#headIconLink").attr("href","../userCenter?account="+acc);
        }else{
            console.log("response data of icon is empty")
        }


    });
}

function changeUserButton() {
    if( sessionStorage.getItem("account")){
        var account = sessionStorage.getItem("account");
        $("#userCenterLink").attr("href",'../userCenter?account='+account);
        // console.log("change userCenter link");
        // window.location = 'http://localhost:3000/userCenter?account='+account;
    }
}