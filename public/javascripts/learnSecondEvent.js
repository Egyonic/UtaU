/*
具体的学习界面的事件处理
1.完整歌词的格式重新整理
* */

$(document).ready(function () {
    console.log('aa');
    var lyrics = $("#entire_lyric").text();
    // console.log(lyrics);
    // var s = ' aa<br>bbb<br>ccc<br>ddd';
    $("#entire_lyric").html( lyrics);
});