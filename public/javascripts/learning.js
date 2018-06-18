/*
* 学习页面的事件处理
* */

var count = 5;
var page = 1;


$(document).ready(function () {
    $("#pageText").html(page);

    $("#songNext").click( nextPage);    //下一页的操作绑定
    $("#songPrevious").click( previousPage);//上一页的操作绑定
    $("#songSearch").click( search);
});

//相应下一页按钮
function nextPage() {
    // console.log("click");

    $.post("learning",{count:count, search:false }, function (data) {
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

        $.post("learning",{count:(readPoint),search:false }, function (data) {
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

function search() {
    var target =$("#songSearchInput").val();
    if( target){
        // console.log('查找歌曲'+target);
        $.post('learning', {songname:target, search:true}, function (data) {
            if(data.songs.length){
                $("#pageText").html('1');  //改变页码
                $("#learningSongCards").html(' ');  //清空原有内容
                for(var i =0; i<data.songs.length; i++){
                    createSongCard(data.songs[i]);
                }
            }else {
                alert("无结果");
            }
        })
    }else{
        // alert('空查询');
        location = 'learning';
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