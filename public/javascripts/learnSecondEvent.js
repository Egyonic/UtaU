/*
具体的学习界面的事件处理
1.完整歌词的格式重新整理
* */

$(document).ready(function () {
    //把纯文本的歌词变成带html标签的形式
    var lyrics = $("#entire_lyric").text();
    $("#entire_lyric").html( lyrics);

    //学习记录
    var account = sessionStorage.getItem("account");
    $.post('learnSecond',{account:account},function (data) {
        console.log(data);
    });
});