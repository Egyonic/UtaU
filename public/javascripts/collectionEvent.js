/*
    collections页面的一些事件处理
*/
var count = 3;
var page = 1;

$(document).ready(function () {
    changeSongs();
    $("#collectionPage").html(page);
    $("#collectionNext").click( nextPage);
    $("#collectionPrevious").click( previousPage);
    $("#collectionSearchBtn").click( searchCollect);
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

//相应下一页按钮
function nextPage() {
    // console.log("click");

    $.post("collections",{count:count }, function (data) {
        var resLength = data.singers.length;
        console.log('next function')
        console.log(resLength);
        console.log(data);

        if(resLength){
            count += data.newCount;
            page = Math.floor( (count+2)/3 );
            $("#collectionPage").html(page);  //改变页码
            //返回内容不为空，创建新的内容
            $("#collectionCards").html(' ');  //清空原有内容
            for(var i =0; i<resLength; i++){
                console.log(data.singers[i]);
                createCollectionCard(data.singers[i]);
            }
            changeSongs();
        }else {
            alert("已经是最后一页了");
        }

        // console.log("page: "+page);
        // console.log("count: "+count);

    });
}

//上一页处理
function previousPage() {
    if( count>3){
        if( count%3 == 0){
            var readPoint =  count -6;//readPoint用来传递要读取的开始位置之前一位
            count = count-3;   //改变当前计数值
        }else{
            var readPoint = count-3-(count%3);
            count = readPoint+3;
        }

        $.post("collections",{count:(readPoint) }, function (data) {
            var resLength = data.singers.length;

            page = Math.floor( (count+2)/3 );
            $("#collectionPage").html(page);  //改变页码
            //返回内容不为空，创建新的内容
            $("#collectionCards").html(' ');  //清空原有内容
            for(var i =0; i<resLength; i++){
                createCollectionCard(data.singers[i]);
            }
            changeSongs();

            // console.log("page: "+page);
            // console.log("count: "+count);

        });
    }else{
        alert("已是最前页");
    }

}

function searchCollect() {
    var target =$("#collectionSearchInput").val();
    if( target){
        // console.log('查找歌曲'+target);
        $.post('collections', {singerName:target, search:true}, function (data) {
            if(data.singers.length){
                $("#collectionPage").html('1');  //改变页码
                $("#collectionCards").html(' ');  //清空原有内容
                for(var i =0; i<data.singers.length; i++){
                    createCollectionCard(data.singers[i]);
                }
            }else {
                alert("无结果");
            }
        })
    }else{
        // alert('空查询');
        location = 'collections';
    }
}

//用传递过来的json对象来创建歌曲单元,使用append
function createCollectionCard(data) {
    var newCard ='<div class="container singerCard">\n' +
        '            <div class="row singerRow">\n' +
        '                <div class="col-3 singer_left">\n' +
        '                    <h4 class="text-center singer_name">'+data.name+'</h4>\n' +
        '                    <h6 class="text-center singer_nickname">'+data.nickname+'</h6>\n' +
        '                    <img class="img-thumbnail singer_img" src='+data.image+'>\n' +
        '                </div>\n' +
        '                <div class="col-7 singer_center">\n' +
        '                    <div class="container singer_description">\n' +data.description+
        '                        ' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-2 singer_right">\n' +
        '                    <div class="singer_songs">\n' + data.songs+
        '                        \n' +
        '                        <!--<a href="#" class="single_song"></a>-->\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>';

    $("#collectionCards").append(newCard);
}