/*
具体的学习界面的事件处理
1.完整歌词的格式重新整理
* */

$(document).ready(function () {
    //把纯文本的歌词变成带html标签的形式
    var lyrics = $("#entire_lyric").text();
    $("#entire_lyric").html( lyrics);

    // $("#collectBtn").click(collect);

    $("#playBtn").click(function () {
        alert('play');
        $("#playBar").play();
    });
    $("#stopBtn").click(function () {
        alert('stop');
        $("#playBar").pause();
    });

    //学习记录
    var account = sessionStorage.getItem("account");
    var sid = sessionStorage.getItem("sid");
    var action = 1;

    $.post('learnSecond',{account:account,action:action,sid:sid,na:2},function (data) {
        console.log(data);
    });
});

//收藏操作
// function collect() {
//     var account = sessionStorage.getItem("account");
//     var sid = sessionStorage.getItem("sid");
//     console.log(sid);
//     var action =2;
//     $.post("learnSecond",{account:account,action:action,sid:sid,na:3},function (data) {
//         if(true){
//
//         }
//     });
// }