$(document).ready(function () {

    $("#userChangeCheckBtn").click( check);

    if( sessionStorage.getItem("account")){
        // var account = sessionStorage.getItem("account");
        // window.location = 'http://localhost:3000/userCenter?account='+account;
    }
    else{
        alert("未登录，请先登录");
    }

    $("#userChangeInfo").click( function () {
        //点击修改信息按钮时，信息外观变化
        $(".form-control-plaintext").attr("contenteditable","true");
        $(".form-control-plaintext").css({ "background-color": "rgba(0, 0, 0, 0.15)",
            "border": "1px solid #636363","border-radius": "3px"
        });
        $("#userChangeCheckBtn").css( { "display":"inline"});
    });

    $("div.rcdCard").each(function () {
        console.log(this.innerHTML);
        var str = this.innerHTML.toString();
        var s = str.indexOf('2018');
        console.log(s);
        // var a = $(this).find("span").innerHTML;
        // console.log(a);
        if( s<0){
            $(this).find("span").parent().parent().parent().css("display","none");
        }
        // this.parent().css("background-color", "red");

    });
});

function check() {
    var name =  $("#userName").text().trim();
    var email = $("#inputPassword").text().trim();
    var sex = $("#userSex").text().trim();
    var desc = $("#userDesc").text().trim();
    var account = sessionStorage.getItem("account");

    // var information ={name:name, email:email, sex:sex, desc:desc};

    $.post("userCenter", {action:"change",name:name, email:email, sex:sex, desc:desc, account:account} ,
        function (data) {
            if(data){
                // alert("修改成功！");
                $("#checkModal").modal('show');
                changeLook();

            }
        })
}

function changeLook() {
    $(".form-control-plaintext").attr("contenteditable","false");
    $(".form-control-plaintext").css({ "background-color": "",
        "border": "none",
    });
    $("#userChangeCheckBtn").css( { "display":"none"});
}

