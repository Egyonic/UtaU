var count = 5;
var page = 1;

$(document).ready(function () {
    changeUserButton();
    checkLogin();   //检查登陆情况，若登陆则改变右上角头像
    $("#checkButton").click( check );
    $("#registerButton").click( register );
    $("#loginButton").click( login );
    $("#pageText").html(page);

    $("#songNext").click( nextPage);    //下一页的操作绑定
    $("#songPrevious").click( previousPage);//上一页的操作绑定

    if( window.location=="http://localhost:3000/collections"){
        changeSongs();
    }
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

//相应下一页按钮
function nextPage() {
    // console.log("click");

    $.post("learning",{count:count }, function (data) {
        var resLength = data.songs.length;

        if(resLength){
            count += data.newCount;
            page = Math.floor( (count+4)/5 );
            $("#pageText").html(page);  //改变页码
            //返回内容不为空，创建新的内容
            $("#learningSongCards").html(' ');  //清空原有内容
            for(var i =0; i<resLength; i++){
                createSongCard(data.songs[i]);
            }
        }else {
            alert("已经是最后一页了");
        }

        // console.log("page: "+page);
        // console.log("count: "+count);

    });
}

//上一页处理
function previousPage() {
    if( count>5){
        if( count%5 == 0){
            var readPoint =  count -10;//readPoint用来传递要读取的开始位置之前一位
            count = count-5;   //改变当前计数值
        }else{
            var readPoint = count-5-(count%5);
            count = readPoint+5;
        }

        $.post("learning",{count:(readPoint) }, function (data) {
            var resLength = data.songs.length;

            page = Math.floor( (count+4)/5 );
            $("#pageText").html(page);  //改变页码
            //返回内容不为空，创建新的内容
            $("#learningSongCards").html(' ');  //清空原有内容
            for(var i =0; i<resLength; i++){
                createSongCard(data.songs[i]);
            }

            // console.log("page: "+page);
            // console.log("count: "+count);

        });
    }else{
        alert("已是最前页");
    }

}

//用传递过来的json对象来创建歌曲单元,使用append
function createSongCard(data) {
    var newCard ='<div class="container songCard">\n' +
        '    <div class="row songRow">\n' +
        '        <div class="col-2 song_left">\n' +
        '            <img src="'+ data.image+ '" class="img-thumbnail song_img">\n' +
        '        </div>\n' +
        '        <div class="col-8 song_center">\n' +
        '           <div class="container">\n' +
        '               <span class="song_title">' + data.name + '</span>\n' +
        '               <span class="song_singer">' + data.singer + '</span>\n' +
        '               <p>\n' +
        '                   '+data.description +
        '               </p>\n' +
        '           </div>\n' +
        '        </div>\n' +
        '        <div class="col-2 song_right">\n' +
        '            <div class="song_data">\n' +
        '                <a class="btn btn-light btn-block" role="button" href="#">学习</a>\n' +
        '                <p class="song_collect">收藏：20</p>\n' +
        '                <p class="song_works">作品：4</p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';
    $("#learningSongCards").append(newCard);
}

//根据登陆改变右上角头像
function changeHeadIcon( acc) {
    $.post("userCenter",{account:acc }, function (data) {
        // console.log(data);
        if(data){
            // console.log("success");
            $("#headIcon").attr("src",data.user.image); //改变头像
            //使头像的链接指向用户中心
            // $("#headIconLink").attr("href","../userCenter?account="+sessionStorage.getItem(acc));
        }else{
            console.log("response data of icon is empty")
        }


    });
}

//歌手页面把用hbs渲染的纯文本变成a标签
function changeSongs() {
    var songs = $(".singer_songs");
    for(var i=0; i<songs.length; i++){  //遍历每个歌手的歌曲块
        var as = '';
        var s = songs[i].innerText.split('*');
        for(var j=0; j<s.length; j++){
            as +='<a href="#" class="single_song">'+s[j]+'</a><hr>';
        }
        songs[i].innerHTML = as;
    }
}

function changeUserButton() {
    if( sessionStorage.getItem("account")){
        var account = sessionStorage.getItem("account");
        $("#userCenterLink").attr("href",'../userCenter?account='+account);
        console.log("change userCenter link");
        // window.location = 'http://localhost:3000/userCenter?account='+account;
    }
}