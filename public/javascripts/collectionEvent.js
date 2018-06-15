/*
    collections页面的一些事件处理
*/
$(document).ready(function () {
    changeSongs();
});

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