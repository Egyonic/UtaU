$(document).ready(function () {
    // console.log(window.location.href);
    if( window.location.href=='http://localhost:3000/userCenter'){
        if( sessionStorage.getItem("account")){
            var account = sessionStorage.getItem("account");
            alert("only userCenter");
            $.post('userCenter',{user:account},function (data) {
                console.log('response data:');
                console.log(data);
            });
        }
        else{
            alert("未登录，请先登录");
        }
    }
});
